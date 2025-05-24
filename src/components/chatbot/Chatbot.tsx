'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
    MessageCircle,
    X,
    Send,
    Maximize2,
    Minimize2,
    Check,
    PlusCircle,
    ChevronUp,
    ChevronDown,
} from 'lucide-react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light'
import js from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript'
import json from 'react-syntax-highlighter/dist/cjs/languages/hljs/json'
import php from 'react-syntax-highlighter/dist/cjs/languages/hljs/php'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { generateText, streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import ReactMarkdown from 'react-markdown'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('php', php)

// Ensure this environment variable is set in your .env file (e.g., .env.local)
// VITE_OPENAI_API_KEY=your_openai_api_key_here
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = createOpenAI({
    compatibility: 'strict', // or 'compatible'
    apiKey: openaiApiKey || '', // Use the environment variable
})

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Array<{ role: string; content: string; isBot: boolean; isStreaming?: boolean }>>([])
    const [inputMessage, setInputMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [specialty, setSpecialty] = useState('')
    const [isSuggestionsExpanded, setIsSuggestionsExpanded] = useState(true)
    const [showSuggestions, setShowSuggestions] = useState(true)
    const [hasContext, setHasContext] = useState(false)
    const [allPageContents, setAllPageContents] = useState('')
    const [autoScroll, setAutoScroll] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)
    const suggestionsContentRef = useRef<HTMLDivElement>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const [suggestionsHeight, setSuggestionsHeight] = useState(0)
    const [locale, setLocale] = useState('')
    const [showChatbot, setShowChatbot] = useState(false)
    const [typingDots, setTypingDots] = useState(1)

    const docsModules = import.meta.glob('/src/doc/**/*.md', { as: 'raw' });

    const importContext = async (specialtyPart: string) => {
        try {
            if (specialtyPart && !hasContext) {
                const response = await fetch(`/chatbot/contextConfig.json`);
                if (!response.ok) {
                    console.error(`Error fetching contextConfig.json: ${response.statusText}`);
                    setShowChatbot(false);
                    return;
                }
                const listData = await response.json();
                const filesConfig = listData[specialtyPart] || listData['general'] || {};

                setShowChatbot(
                    !!filesConfig &&
                    ((filesConfig.docs && filesConfig.docs.length) || (filesConfig.api && filesConfig.api.length)) &&
                    (filesConfig['show-chatbot'] ?? true)
                )

                if (!showChatbot && !(filesConfig['show-chatbot'] ?? true)) {
                    return;
                }

                const getDocs = (filesConfig.docs || []).map((fp: string) => {
                    const key = `/src/doc/${fp}`
                    if (!docsModules[key]) {
                        return Promise.resolve(''); // Return empty string for missing files
                    }
                    return docsModules[key]()  // devuelve el contenido raw
                });

                const docsArray = await Promise.all(getDocs);
                const joinedDocs = docsArray.filter(doc => doc).join('\n\n');

                setAllPageContents(joinedDocs);
                setHasContext(true);

                return { docs: joinedDocs };
            } else if (!specialtyPart) {
                const response = await fetch(`/chatbot/contextConfig.json`);
                if (!response.ok) {
                    console.error(`Error fetching contextConfig.json: ${response.statusText}`);
                    setShowChatbot(false);
                    return;
                }
                const listData = await response.json();
                const generalFilesConfig = listData['general'] || {};

                setShowChatbot(
                    !!generalFilesConfig &&
                    ((generalFilesConfig.docs && generalFilesConfig.docs.length) || (generalFilesConfig.api && generalFilesConfig.api.length)) &&
                    (generalFilesConfig['show-chatbot'] ?? true)
                );

                if (!showChatbot && !(generalFilesConfig['show-chatbot'] ?? true)) {
                    return;
                }

                const getDocs = (generalFilesConfig.docs || []).map((fp: string) => {
                    const key = `/src/doc/${fp}`;
                    if (!docsModules[key]) {
                        return Promise.resolve('');
                    }
                    return docsModules[key]();
                });
                const docsArray = await Promise.all(getDocs);
                const joinedDocs = docsArray.filter(doc => doc).join('\n\n');

                setAllPageContents(joinedDocs);
                setHasContext(true);

                return { docs: joinedDocs };
            } else {
                setShowChatbot(false);
            }
        } catch (error) {
            console.error('Error importing context:', error);
            setShowChatbot(false);
        }
    }

    const suggestions = [
        '¿Qué es ProSalud?',
        'Certificado de convenio sindical',
        'Consultar estado de una incapacidad',
        'Información de contacto',
    ]
    
    const AVATAR_URL = '/bot_avatar.png'
        
    const updateSuggestionsHeight = () => {
        if (suggestionsContentRef.current) {
            const headerHeight = 40 // Height of the suggestions header
            const contentHeight = suggestionsContentRef.current.scrollHeight
            const maxHeight = Math.min(contentHeight + headerHeight, 300) // Limitar la altura máxima a 300px
            setSuggestionsHeight(maxHeight)
        }
    }

    useEffect(() => {
        updateSuggestionsHeight()
        window.addEventListener('resize', updateSuggestionsHeight)

        return () => window.removeEventListener('resize', updateSuggestionsHeight)
    }, [suggestions, messages])

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let clickCount = 0

        const handleClickOutside = (event: MouseEvent) => {
            if (
                chatContainerRef.current &&
                !chatContainerRef.current.contains(event.target as Node)
            ) {
                clickCount++
                if (clickCount === 1) {
                    timer = setTimeout(() => {
                        clickCount = 0
                    }, 300) // 300ms para detectar doble clic
                } else if (clickCount === 2) {
                    clearTimeout(timer)
                    clickCount = 0
                    setIsOpen(false)
                }
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
            clearTimeout(timer)
        }
    }, [])

    const initializeMessages = (currentSpecialty: string, docs: string | null, isGeneralContext: boolean) => {
        const date = new Date()
        const currentDateTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` // Fixed month

        let systemPrompt = `Eres un asistente de IA especializado en ProSalud, sindicato de profesionales de la salud. Tu objetivo principal es ayudar a los afiliados con sus trámites y consultas. Responde siempre en español, de forma clara, concisa y amigable. No inventes información; básate únicamente en la documentación proporcionada.
        Documentación de referencia (en Markdown): """${docs || 'No hay documentación específica cargada para esta sección.'}"""
        
        **Instrucciones Generales:**
        1.  **Idioma y Tono:** Español. Tono amable, profesional y servicial. Utiliza emojis apropiados para complementar tus respuestas y hacerlas más cercanas. Evita jerga técnica innecesaria.
        2.  **Longitud:** Respuestas breves y directas, idealmente no más de 200-300 tokens. Si una pregunta requiere una respuesta larga, considera dividirla en puntos o pasos.
        3.  **Precisión:** No inventes información. Si no encuentras la respuesta en la documentación, indícalo claramente.
        4.  **Fecha y Hora:** Hoy es ${currentDateTime}.
        5.  **Limitación de Items:** Si el usuario solicita más de 5 ítems (preguntas, recomendaciones, pasos, etc.), responde: "Puedo ayudarte con hasta 5 puntos a la vez. ¿Podrías especificar un poco más tu solicitud? 😊" y no proporciones la lista.

        **Información de Contacto Específica de ProSalud:**
        Cuando los usuarios pregunten sobre canales de contacto o soporte, proporciona la siguiente información:
        -   **Sede Principal Medellín:** Calle 53 N° 45 – 51 (Maracaibo con la Av. Oriental).
        -   **Teléfonos:** (604) 4480379 – (604) 5133101
        -   **Celulares:** 3013529318 – 3122574127
        -   **Correos Electrónicos:**
            *   Presidencia: presidencia@prosalud.co
            *   Comunicaciones: comunicaciones@prosalud.co
            *   Secretaría General: informacion@prosalud.co
            *   Consultas Generales: info@prosalud.co
        -   **Página de Contacto:** https://prosalud-redesign.lovable.app/nosotros/quienes-somos (Sección de contacto al final)
        -   **Horario de Atención:** Lunes a Viernes de 8:00 a.m. a 5:00 p.m. (Jornada continua).
        *Importante:* No inventes otros canales o procesos de soporte.

        **Manejo de Preguntas (Casos Específicos):**
        *   **Preguntas ambiguas o sin respuesta clara en la documentación:**
            1.  Reconoce la pregunta (ej: "Entiendo que quieres saber sobre X...").
            2.  Si hay información parcial, compártela.
            3.  Si no hay información, indícalo amablemente: "Actualmente no tengo información detallada sobre eso en mi base de datos."
            4.  Dirige al usuario a los canales de contacto oficiales de ProSalud (mencionados arriba) para obtener ayuda personalizada.
            5.  Recuerda: "Es mejor no dar una respuesta que dar información incorrecta."
        *   **Información no disponible:**
            Si se pregunta algo que no está en la documentación:
            1.  Responde amablemente que la información no está disponible en tu base de conocimiento actual.
            2.  Sugiere: "Te recomiendo contactar directamente a ProSalud a través de sus canales oficiales para obtener la información más precisa." (Incluye los canales).
            3.  Opcional: "Puedo tomar nota para que el equipo considere incluir esta información en el futuro."

        **Enlaces y Documentación del Sitio Web:**
        *   Cuando menciones un trámite, servicio o sección específica del sitio web, SIEMPRE incluye un enlace Markdown directo a la página correspondiente. Por ejemplo: "Puedes encontrar más detalles sobre el Certificado de Convenio Sindical [aquí](/servicios/certificado-convenio)."
        *   Si el usuario busca cómo realizar un trámite que tiene un formulario en el sitio, explícale brevemente el propósito del trámite y dirígelo al formulario con un enlace.

        **Recordatorios Finales:**
        -   Sé proactivo al ofrecer ayuda.
        -   Verifica siempre la documentación antes de responder.
        -   Si un documento Markdown específico sobre un servicio (ej: \`servicios/nombre-servicio.md\`) existe, prioriza la información de ese archivo.
        -   La documentación general en \`README.md\` y \`servicios/overview.md\` puede usarse como complemento.
        
        Contenido del sitio web general (capturado al momento de la carga, puede ser menos específico que los .md):
        ${isGeneralContext && typeof document !== 'undefined' ? document.body.innerText.substring(0, 2000) : 'Contexto de página no disponible.'}
        `;

        const systemMessage = {
            role: 'system',
            content: systemPrompt,
            isBot: true,
        }

        const initialMessageContent = getInitialMessage(currentSpecialty);
        const initialMessage = {
            role: 'assistant',
            content: initialMessageContent,
            isBot: true,
        }

        setMessages([systemMessage, initialMessage])
    }

    const initializeChat = async () => {
        const newSpecialtyInfo = extractSpecialtyFromURL();
        
        let contextData;
        if (!hasContext || newSpecialtyInfo.specialtyPart !== specialty) {
            contextData = await importContext(newSpecialtyInfo.specialtyPart);
        } else {
            contextData = { docs: allPageContents }; // Use existing loaded docs
        }
    
        let docs = contextData?.docs || null;
    
        await resetChatState(newSpecialtyInfo.specialty);
        setSpecialty(newSpecialtyInfo.specialty);
        setLocale(typeof window !== 'undefined' && window.location.pathname.includes('/en/') ? 'en' : 'es');
    
        initializeMessages(
            newSpecialtyInfo.specialty,
            docs,
            newSpecialtyInfo.specialty === 'general' || !newSpecialtyInfo.specialtyPart
        );
    };
    

    const extractSpecialtyFromURL = () => {
        if (typeof window === 'undefined') {
            return { specialty: 'general', specialtyPart: 'general' };
        }
        const path = window.location.pathname;
        const parts = path.split('/').filter(Boolean); // remove empty strings
    
        let pageKey = 'general';
        if (parts.length > 0) {
            if (parts[0] === 'servicios' && parts[1]) {
                pageKey = parts[1];
            } else if (parts[0] === 'nosotros' && parts[1]) {
                pageKey = parts[1];
            } else if (parts[0]) {
                pageKey = parts[0];
            }
        }
    
        const specialtyMap: { [key: string]: string } = {
            'quienes-somos': 'Información Institucional',
            'servicios': 'Servicios al Afiliado',
            'documentos-formatos': 'Documentos y Formatos',
            'login': 'Acceso Afiliados',
            'estructura-organizacional': 'Estructura Organizacional',
            'estatutos': 'Estatutos y Beneficios',
            'contrato-sindical': 'Contrato Sindical',
            'certificado-convenio': 'Certificado de Convenio Sindical',
            'descanso-laboral': 'Solicitud de Descanso Laboral',
            'compensacion-anual': 'Compensación Anual Diferida',
            'consulta-pagos': 'Consulta de Pagos',
            'incapacidad-maternidad': 'Incapacidades y Licencias',
            'actualizar-cuenta': 'Actualización de Cuenta Bancaria',
            'sst': 'Seguridad y Salud en el Trabajo',
            'microcredito': 'Solicitud de Microcrédito',
            'retiro-sindical': 'Solicitud de Retiro Sindical',
            'general': 'Asistencia General de ProSalud',
        };
        
        const derivedSpecialty = specialtyMap[pageKey] || 'Asistencia General de ProSalud';
        const contextKeyForConfig = 'general';

        return {
            specialty: derivedSpecialty,
            specialtyPart: contextKeyForConfig 
        };
    };

    const getInitialMessage = (currentSpecialty: string) => {
        if (currentSpecialty && currentSpecialty !== 'general' && currentSpecialty !== 'Asistencia General de ProSalud') {
            return `¡Hola! Soy tu asistente virtual de ProSalud, especializado en ${currentSpecialty}. ¿En qué puedo ayudarte hoy? 🤖`;
        }
        return `¡Hola! 👋 Soy tu asistente virtual de ProSalud. Estoy aquí para ayudarte con tus trámites y consultas. ¿Cómo puedo colaborarte hoy?`;
    };

    const resetChatState = async (currentSpecialty: string) => {
        setInputMessage('');
        setIsTyping(false);
        setShowSuggestions(true);
        setIsSuggestionsExpanded(true);
    };
    
    useEffect(() => {
    }, [messages]);

    const startNewChat = async () => {
        const newSpecialtyInfo = extractSpecialtyFromURL();
        await resetChatState(newSpecialtyInfo.specialty);
        setSpecialty(newSpecialtyInfo.specialty);
        setHasContext(false);
        await initializeChat();
    };

    useEffect(() => {
        const handleURLChange = () => {
            const newSpecialtyInfo = extractSpecialtyFromURL();
            const newPathLocale = typeof window !== 'undefined' && window.location.pathname.includes('/en/') ? 'en' : 'es';
    
            const specialtyChanged = newSpecialtyInfo.specialty !== specialty;
            const localeChanged = newPathLocale !== locale;
    
            if (specialtyChanged || localeChanged) {
                setSpecialty(newSpecialtyInfo.specialty);
                setLocale(newPathLocale);
                setHasContext(false);
                initializeChat();
            }
        };
    
        setSpecialty(extractSpecialtyFromURL().specialty);
        setLocale(typeof window !== 'undefined' && window.location.pathname.includes('/en/') ? 'en' : 'es');
        initializeChat();
    
        if (typeof window !== 'undefined') {
            window.addEventListener('popstate', handleURLChange);
            const originalPushState = window.history.pushState;
            const originalReplaceState = window.history.replaceState;
    
            window.history.pushState = function (...args) {
                originalPushState.apply(this, args);
                handleURLChange();
            };
    
            window.history.replaceState = function (...args) {
                originalReplaceState.apply(this, args);
                handleURLChange();
            };
    
            return () => {
                window.removeEventListener('popstate', handleURLChange);
                window.history.pushState = originalPushState;
                window.history.replaceState = originalReplaceState;
            };
        }
    }, []);

    const toggleChat = () => {
        if (!isOpen && !openaiApiKey) {
            console.warn("OpenAI API Key (VITE_OPENAI_API_KEY) is not set. Chatbot may not function correctly.");
        }
        setIsFullscreen(false);
        setIsOpen(!isOpen);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value)
        adjustTextareaHeight()
    }

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${Math.min(
                textareaRef.current.scrollHeight,
                150 
            )}px`
        }
    }
    
    const renderers = {
        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
                <SyntaxHighlighter
                    language={match[1]}
                    style={atomOneDark}
                    customStyle={{
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        margin: '1rem 0',
                        overflow: 'auto',
                        maxWidth: '100%',
                    }}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            )
        },
        a({ node, children, href, ...props }: any) {
            const isRelative = href && href.startsWith('/') && !href.startsWith('//')
            const finalHref = isRelative && typeof window !== 'undefined'
                ? `${window.location.origin}${href}`
                : href

            return (
                <a
                    href={finalHref}
                    className="text-prosalud-nombre hover:text-prosalud-nombre/80 underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                >
                    {children}
                </a>
            )
        },
        p: ({ children }: any) => <p className="my-1 leading-relaxed">{children}</p>,
        br: () => <br className="my-px" />,
        ul: ({ children }: any) => <ul className="ml-4 my-2 list-disc space-y-0.5">{children}</ul>,
        ol: ({ children }: any) => <ol className="ml-4 my-2 list-decimal space-y-0.5">{children}</ol>,
        li: ({ children }: any) => <li className="ml-1">{children}</li>,
        h1: ({ children }: any) => <h1 className="text-xl font-bold my-3">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-lg font-bold my-2">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-md font-semibold my-2">{children}</h3>,
        h4: ({ children }: any) => <h4 className="font-semibold my-1">{children}</h4>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-gray-300 pl-3 py-1 my-2 italic dark:border-gray-600">{children}</blockquote>,
    }

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        if (inputMessage.trim() === '' || !openaiApiKey) {
            if (!openaiApiKey) {
                console.error("Cannot send message: OpenAI API Key is not configured.");
                setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ No puedo procesar tu mensaje porque la clave API de OpenAI no está configurada. Por favor, contacta al administrador.", isBot: true }]);
            }
            return;
        }

        const text = inputMessage.trim();
        const match = text.match(/dame\s+(\d+)\s+preguntas?/i);
        if (match) {
            const n = parseInt(match[1], 10);
            if (n > 5) {
                const warning = {
                    role: 'assistant',
                    content: `Lo siento, puedo generar hasta 5 ítems (preguntas, recomendaciones, pasos, etc.) a la vez. ¿Podrías solicitar un número menor o acotar tu petición?`,
                    isBot: true
                };
                setMessages(prev => [...prev, { role: 'user', content: text, isBot: false }, warning]);
                setInputMessage('');
                return;
            }
        }

        const newMessage = {
            role: 'user',
            content: inputMessage.replace(/\n$/, ''),
            isBot: false,
        }

        let currentChatMessages: Array<{ role: string; content: string; isBot: boolean; isStreaming?: boolean }> = [];

        setMessages((prevMessages) => {
            currentChatMessages = [...prevMessages, newMessage];
            return currentChatMessages;
        })
        setInputMessage('')
        setShowSuggestions(false)
        setIsSuggestionsExpanded(false)
        setIsTyping(true)

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
        }

        try {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: '', isBot: true, isStreaming: true },
            ])

            const { textStream } = await streamText({
                model: openai('gpt-4o-mini'),
                messages: currentChatMessages.filter(m => m.role === 'system' || m.role === 'user' || m.role === 'assistant'),
                maxTokens: 450,
            })

            let streamedText = ''

            for await (const delta of textStream) {
                streamedText += delta

                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages]
                    if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].isStreaming) {
                        updatedMessages[updatedMessages.length - 1] = {
                            ...updatedMessages[updatedMessages.length - 1],
                            content: streamedText,
                        }
                    }
                    return updatedMessages
                })
            }

            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages]
                if (updatedMessages.length > 0 && updatedMessages[updatedMessages.length - 1].isStreaming) {
                    updatedMessages[updatedMessages.length - 1] = {
                        role: 'assistant',
                        content: streamedText,
                        isBot: true,
                        isStreaming: false,
                    }
                }
                return updatedMessages
            })
        } catch (error) {
            console.error('Error generating response:', error)
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: "Lo siento, encontré un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde. Si el problema persiste, contacta al administrador. 🛠️",
                    isBot: true,
                    isStreaming: false,
                },
            ])
        } finally {
            setIsTyping(false)
            setShowSuggestions(true)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage(e)
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        setInputMessage(suggestion)
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }

    const handleScroll = () => {
        if (messagesEndRef.current?.parentElement) {
            const { scrollTop, scrollHeight, clientHeight } = messagesEndRef.current.parentElement;
            const atBottom = scrollHeight - scrollTop - clientHeight < 10;
            setAutoScroll(atBottom);
        }
    };

    useEffect(() => {
        if (autoScroll) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, autoScroll])

    useEffect(() => {
        const messagesContainer = messagesEndRef.current?.parentElement
        if (messagesContainer) {
            messagesContainer.addEventListener('scroll', handleScroll)
            return () => messagesContainer.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTyping) {
            interval = setInterval(() => {
                setTypingDots(prev => prev >= 3 ? 1 : prev + 1)
            }, 500)
        }
        return () => clearInterval(interval)
    }, [isTyping])

    const renderTypingIndicator = () => {
        const dots = '.'.repeat(typingDots)
        return (
            <div className="inline-flex items-center rounded-lg bg-white px-3 py-2.5 text-gray-700 shadow-md dark:bg-gray-700 dark:text-gray-200">
                <img
                    src={AVATAR_URL}
                    alt="Bot Avatar"
                    className="mr-2 h-6 w-6 rounded-full"
                />
                <div className="ml-1 inline-flex h-5 items-center">
                    <span className="font-medium tracking-wide">
                        <span className="font-mono text-lg">{dots}</span>
                        <span className="invisible select-none">...</span>
                    </span>
                </div>
            </div>
        )
    }

    const markdownStyles = `
    .markdown-content {
      line-height: 1.6; /* Slightly increased line-height */
      font-size: 0.9rem; /* Adjust base font size */
    }
    .markdown-content p {
      margin-bottom: 0.75rem;
    }
    .markdown-content p:last-child {
      margin-bottom: 0;
    }
    .markdown-content ul, .markdown-content ol {
      margin-top: 0.5rem;
      margin-bottom: 0.75rem;
      padding-left: 1.25rem; /* Ensure enough padding for markers */
    }
    .markdown-content li {
      margin-bottom: 0.35rem; /* Slightly more space between list items */
    }
    .markdown-content li:last-child {
      margin-bottom: 0;
    }
    .markdown-content pre {
      margin: 1rem 0; /* More vertical margin for code blocks */
      padding: 0.8rem;
      border-radius: 0.375rem; /* Equivalent to rounded-md */
      background-color: #2d3748; /* A dark background, adjust if needed */
      color: #e2e8f0; /* Light text color for dark background */
      overflow-x: auto;
    }
    .markdown-content code:not(pre > code) { /* Inline code */
      background-color: #edf2f7; /* Lighter background for inline code */
      color: #2d3748; /* Darker text for inline code */
      padding: 0.125rem 0.25rem;
      border-radius: 0.25rem;
      font-size: 0.85em; /* Slightly smaller for inline code */
    }
    .dark .markdown-content pre {
      background-color: #1a202c;
      color: #cbd5e0;
    }
    .dark .markdown-content code:not(pre > code) {
      background-color: #2d3748;
      color: #e2e8f0;
    }
    .markdown-content blockquote {
      border-left: 3px solid #718096; /* Adjusted border color */
      padding-left: 1rem;
      font-style: italic;
      margin: 1rem 0; /* More vertical margin */
      color: #4a5568; /* Text color for blockquote */
    }
    .dark .markdown-content blockquote {
      border-left-color: #a0aec0;
      color: #cbd5e0;
    }
    .markdown-content h1, .markdown-content h2, .markdown-content h3, 
    .markdown-content h4, .markdown-content h5, .markdown-content h6 {
      font-weight: 600;
      margin-top: 1.5rem; /* More top margin for headings */
      margin-bottom: 0.75rem;
      line-height: 1.3; /* Adjust line height for headings */
    }
    .markdown-content h1 { font-size: 1.5rem; } /* Larger h1 */
    .markdown-content h2 { font-size: 1.25rem; } /* Larger h2 */
    .markdown-content h3 { font-size: 1.1rem; }
    .markdown-content h4, .markdown-content h5, .markdown-content h6 { font-size: 1rem; }
    .markdown-content a {
        color: #2563eb; /* theme('colors.blue.600') */
        text-decoration: underline;
    }
    .markdown-content a:hover {
        color: #1d4ed8; /* theme('colors.blue.700') */
    }
    .dark .markdown-content a {
        color: #60a5fa; /* theme('colors.blue.400') */
    }
    .dark .markdown-content a:hover {
        color: #93c5fd; /* theme('colors.blue.300') */
    }
  `;
    
    if (!showChatbot && !isOpen) {
        return null;
    }
    
    return (
        <>
            <style>{markdownStyles}</style>
            {showChatbot && !isOpen && (
                 <button
                    onClick={toggleChat}
                    className={`fixed bottom-6 right-6 z-[9998] transform rounded-full bg-prosalud-salud p-3.5
                    text-white shadow-xl transition-all 
                    duration-300 hover:rotate-3 hover:scale-110 hover:bg-prosalud-salud/90 focus:outline-none
                    focus:ring-2 focus:ring-prosalud-salud focus:ring-offset-2
                    ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} 
                  `}
                    title="Abrir chat de ayuda"
                    aria-label="Abrir chat de ayuda"
                >
                    <MessageCircle className="h-7 w-7" />
                </button>
            )}

            {(showChatbot || isOpen) && (
                <div
                    className={`fixed ${isFullscreen ? 'inset-0' : 'bottom-4 right-4 md:bottom-6 md:right-6'
                        } z-[9999]`}
                >
                    <div
                        ref={chatContainerRef}
                        className={`
                            overflow-hidden rounded-xl border-2 border-prosalud-sindicato/30 bg-white shadow-2xl 
                            transition-all duration-300 ease-in-out dark:border-prosalud-sindicato/50 dark:bg-gray-900
                            ${isOpen
                                ? 'scale-100 opacity-100'
                                : 'pointer-events-none scale-95 opacity-0'
                            }
                            ${isFullscreen
                                ? 'fixed inset-0 m-0 flex flex-col rounded-none'
                                : `relative h-[calc(100vh-6rem)] max-h-[40rem] w-[calc(100vw-2rem)] sm:w-96 md:max-h-[42rem] md:w-[26rem]`
                            }
                        `}
                    >
                        <div className="flex h-full flex-col">
                             <div
                                className={`flex items-center justify-between border-b border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800 ${isFullscreen ? 'h-16 px-4' : 'h-14'
                                    }`}
                            >
                                <h2
                                    className={`flex items-center text-base font-semibold text-gray-800 dark:text-white ${isFullscreen ? 'text-xl' : ''
                                        }`}
                                >
                                    <img
                                        src={AVATAR_URL}
                                        alt="Asistente ProSalud"
                                        width={isFullscreen ? 40 : 32}
                                        height={isFullscreen ? 40 : 32}
                                        className="mr-3 rounded-full"
                                    />
                                    Asistente ProSalud
                                </h2>
                                <div className="flex items-center space-x-1.5">
                                    <button
                                        onClick={startNewChat}
                                        className="text-gray-500 transition-colors duration-200 hover:text-prosalud-sindicato focus:outline-none dark:text-gray-400 dark:hover:text-prosalud-sindicato"
                                        title="Iniciar nuevo chat"
                                        aria-label="Iniciar nuevo chat"
                                    >
                                        <PlusCircle className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={toggleFullscreen}
                                        className="text-gray-500 transition-colors duration-200 hover:text-prosalud-sindicato focus:outline-none dark:text-gray-400 dark:hover:text-prosalud-sindicato"
                                        title={
                                            isFullscreen
                                                ? 'Minimizar'
                                                : 'Pantalla completa'
                                        }
                                        aria-label={
                                            isFullscreen
                                                ? 'Minimizar'
                                                : 'Pantalla completa'
                                        }
                                    >
                                        {isFullscreen ? (
                                            <Minimize2 className="h-5 w-5" />
                                        ) : (
                                            <Maximize2 className="h-5 w-5" />
                                        )}
                                    </button>
                                    <button
                                        onClick={toggleChat}
                                        className="text-gray-500 transition-colors duration-200 hover:text-prosalud-sindicato focus:outline-none dark:text-gray-400 dark:hover:text-prosalud-sindicato"
                                        title="Cerrar chat"
                                        aria-label="Cerrar chat"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <p
                                className={`border-b border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 truncate ${isFullscreen ? 'py-2 text-sm px-4' : ''
                                    }`}
                                title={specialty}
                            >
                                {specialty === 'general' || specialty === 'Asistencia General de ProSalud'
                                    ? 'Asistente General de ProSalud'
                                    : `Asistente para: ${specialty}`}
                            </p>
                            <div
                                className={`relative flex flex-grow flex-col overflow-hidden ${isFullscreen ? 'mx-auto w-full max-w-4xl' : ''
                                    }`}
                            >
                                <div
                                    className={`flex-grow space-y-3 overflow-y-auto bg-gray-100 px-3 pb-4 pt-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:bg-gray-850 dark:scrollbar-thumb-gray-600 ${isFullscreen ? 'px-5 text-base pb-6 pt-4' : 'text-sm'
                                        }`}
                                    onScroll={handleScroll}
                                >
                                    {messages
                                        .filter((message) => message.role !== 'system')
                                        .map((message, index) => {
                                            if (message.isBot && message.content === '' && message.isStreaming) {
                                                return (
                                                    <div key={`typing-${index}`} className="flex justify-start">
                                                        {renderTypingIndicator()}
                                                    </div>
                                                );
                                            }
                                            if (message.isBot && message.content === '' && !message.isStreaming) {
                                                return null;
                                            }

                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex items-end gap-2
                                                        ${message.isBot ? 'justify-start' : 'justify-end'} 
                                                    `}
                                                >
                                                    {message.isBot && (
                                                        <img src={AVATAR_URL} alt="Bot" className="h-6 w-6 rounded-full self-start shadow-sm" />
                                                    )}
                                                    <div
                                                        className={`rounded-lg px-3 py-2 ${message.isBot
                                                            ? 'bg-white text-gray-800 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                                                            : 'bg-prosalud-sindicato text-white shadow-sm'
                                                            } max-w-[85%] overflow-x-auto transition-all duration-200 ease-out ${index === messages.length - 2 && isTyping ? 'animate-none' : 
                                                               (index >= messages.length - (isTyping ? 2:1)) ? 'animate-fadeInQuick' : ''
                                                            }`}
                                                    >
                                                        <div className="break-words markdown-content">
                                                            <ReactMarkdown components={renderers}>
                                                                {message.content}
                                                            </ReactMarkdown>
                                                        </div>
                                                        {!message.isBot && index === messages.filter(m => m.role !== 'system').length -1 && !isTyping && (
                                                            <div className="mt-0.5 flex justify-end items-center pt-0.5">
                                                                <Check className="h-3.5 w-3.5 text-blue-200" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    <div ref={messagesEndRef} />
                                </div>
                                {showSuggestions && suggestions.length > 0 && (
                                    <div
                                        ref={suggestionsRef}
                                        className={`absolute ${isFullscreen ? 'bottom-[76px]' : 'bottom-[60px]' }
                                            left-0 right-0 z-10 overflow-hidden border-t border-gray-200 bg-gray-50/90 backdrop-blur-sm transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800/90 ${isFullscreen ? 'mx-auto w-full max-w-4xl' : ''
                                            }`}
                                        style={{
                                            maxHeight: isSuggestionsExpanded
                                                ? `${Math.min(suggestionsHeight, 200)}px`
                                                : '36px',
                                            transform: `translateY(${isSuggestionsExpanded
                                                ? '0'
                                                : `calc(100% - ${isFullscreen ? '52px' : '36px'})`
                                                })`,
                                        }}
                                    >
                                        <div
                                            className={`flex h-9 items-center justify-between bg-gray-100/80 px-3 py-2 dark:bg-gray-700/80 cursor-pointer`}
                                            onClick={() => setIsSuggestionsExpanded(!isSuggestionsExpanded)}
                                        >
                                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                Sugerencias
                                            </p>
                                            <button
                                                className="text-gray-600 transition-colors duration-200 hover:text-prosalud-sindicato focus:outline-none dark:text-gray-400 dark:hover:text-prosalud-sindicato"
                                                aria-label={
                                                    isSuggestionsExpanded
                                                        ? 'Contraer sugerencias'
                                                        : 'Expandir sugerencias'
                                                }
                                            >
                                                {isSuggestionsExpanded ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronUp className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        <div ref={suggestionsContentRef} className="px-2.5 py-2 overflow-y-auto" style={{maxHeight: isSuggestionsExpanded ? `calc(${Math.min(suggestionsHeight, 200)}px - 36px)` : '0px'}}>
                                            <div
                                                className={`grid grid-cols-1 gap-1.5 ${isFullscreen ? 'sm:grid-cols-2 md:grid-cols-2' : 'sm:grid-cols-1'}`}
                                            >
                                                {suggestions.map((suggestion, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="truncate rounded-md bg-white px-2.5 py-1.5 text-left text-xs text-gray-700 shadow-sm transition-colors duration-200 hover:bg-prosalud-sindicato/10 focus:outline-none focus:ring-1 focus:ring-prosalud-sindicato dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-prosalud-sindicato/20"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <form
                                    onSubmit={handleSendMessage}
                                    className={`relative z-20 border-t border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 ${isFullscreen ? 'mx-auto w-full max-w-4xl p-3' : ''
                                        }`}
                                >
                                    <div className="flex items-end gap-2">
                                        <textarea
                                            ref={textareaRef}
                                            value={inputMessage}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            className={`flex-grow resize-none overflow-hidden rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 shadow-sm transition-all duration-200 focus:border-prosalud-sindicato focus:outline-none focus:ring-1 focus:ring-prosalud-sindicato dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-prosalud-sindicato dark:focus:ring-prosalud-sindicato ${isFullscreen
                                                ? 'max-h-[180px] min-h-[3rem] text-base'
                                                : 'max-h-[120px] min-h-[2.5rem]'
                                                }`}
                                            placeholder="Escribe tu mensaje..."
                                            rows={1}
                                            aria-label="Mensaje"
                                            disabled={isTyping || !openaiApiKey}
                                        />
                                        <button
                                            type="submit"
                                            className={`transform rounded-lg bg-prosalud-sindicato p-2.5 text-white transition-all duration-200 hover:bg-prosalud-sindicato/90 focus:outline-none focus:ring-2 focus:ring-prosalud-sindicato focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 ${isFullscreen ? 'p-3' : ''
                                                }`}
                                            disabled={isTyping || inputMessage.trim() === '' || !openaiApiKey}
                                            title="Enviar mensaje"
                                            aria-label="Enviar mensaje"
                                        >
                                            <Send
                                                className={`${isFullscreen ? 'h-5 w-5' : 'h-4 w-4'}`}
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Chatbot;
