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
    ThumbsUp,
    ThumbsDown,
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

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [specialty, setSpecialty] = useState('')
    const [isSuggestionsExpanded, setIsSuggestionsExpanded] = useState(true)
    const [showSuggestions, setShowSuggestions] = useState(true)
    const [hasContext, setHasContext] = useState(false)
    const [indications, setIndications] = useState('')
    const [allPageContents, setAllPageContents] = useState('')
    const [autoScroll, setAutoScroll] = useState(true)
    const messagesEndRef = useRef(null)
    const textareaRef = useRef(null)
    const suggestionsRef = useRef(null)
    const suggestionsContentRef = useRef(null)
    const chatContainerRef = useRef(null)
    const [suggestionsHeight, setSuggestionsHeight] = useState(0)
    const [locale, setLocale] = useState('')
    const [showChatbot, setShowChatbot] = useState(false)
    const [typingDots, setTypingDots] = useState(1)

    const docsModules = import.meta.glob('/src/doc/**/*.md', { as: 'raw' });

    const importContext = async (specialtyPart) => {
        try {
            if (specialtyPart && !hasContext) {
                const listData = await fetch(`/chatbot/contextConfig.json`).then(r => r.json())
                const files = listData[specialtyPart] || {}

                setShowChatbot(
                    !!files &&
                    ((files.docs && files.docs.length) || (files.api && files.api.length)) &&
                    (files['show-chatbot'] ?? true)
                )

                // Cargamos los MD como texto
                const getDocs = (files.docs || []).map(fp => {
                    const key = `/src/doc/${fp}`
                    if (!docsModules[key]) {
                        throw new Error(`No encuentro el módulo para la ruta ${key}`)
                    }
                    return docsModules[key]()  // devuelve el contenido raw
                })

                const docsArray = await Promise.all(getDocs)
                const joinedDocs = docsArray.join('\n\n')   // 👈 CAMBIO: construimos la string completa

                // Guardamos el contexto en estado
                setAllPageContents(joinedDocs)
                setIndications(joinedDocs)
                setHasContext(true)

                // Devolvemos los valores para initializeChat
                return { docs: joinedDocs }
            } else {
                setShowChatbot(false)
            }
        } catch (error) {
            console.error('Error:', error)
            setShowChatbot(false)
        }
    }

    const suggestions = [
        '¿Qué es ProSalud?',
        'Certificado de convenio sindical',
        'Consultar estado de una incapacidad',
        'Información de contacto',
    ]

    const openai = createOpenAI({
        compatibility: 'strict',
        apiKey: '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',
        /** TODO: MANEJAR VARIABLE DE ENTORNO */
    })

    const AVATAR_URL = '/bot_avatar.png'
        // 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyKQfbFObUQu4wMCYalXLZZ_xilW1J7xriag&s'
        

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
        let timer
        let clickCount = 0

        const handleClickOutside = (event) => {
            if (
                chatContainerRef.current &&
                !chatContainerRef.current.contains(event.target)
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

    const initializeMessages = (specialty, docs, isGeneral) => {
        const date = new Date()
        let currentDateTime = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

        let systemPrompt

        if (isGeneral) {
            const pageContent = document.body.innerText
            systemPrompt = `Eres un asistente de IA especializado en ProSalud, sindicato de profesionales de la salud.  A continuación tienes la documentación de referencia (en Markdown): """${docs}""" Responde siempre en español, de forma clara y breve. No inventes información.
            **Your answers should not exceed 300 tokens and preferably give complete answers in a maximum of 200 tokens.**.
            Current Date and Time is ${currentDateTime}.
            Use emojis to complement your responses.
            Use natural expressions to sound more human.
            Please provide a short and concrete answer.

            CONTACT INFORMATION:
            When users ask about contact channels or ways to get support, please provide the following information:
            - Phone numbers: 
            - Contact form: https://prosalud-redesign.lovable.app/nosotros/quienes-somos

            IMPORTANT: You don't know specific details about how to contact support beyond these channels. Don't invent or assume support processes. Just share these official channels when users need help.

            DOCUMENTATION FEATURES:
            - Language: Spanish
            - Dark/Light mode: Users can toggle between dark and light mode using the moon/sun icon in the top right corner.
            - Search bar: Located at the top of the documentation.
            -If the user requests more than 5 items (questions, recommendations, steps, etc.), tell them: "Sorry, I can give you up to 5 items at a time. Can you narrow down your request?" and don't include any other content.

            AMBIGUOUS OR DIFFICULT QUESTIONS:
            When a user asks a question that is ambiguous, difficult to answer, or doesn't have a clear answer in the documentation:
            1. Acknowledge the complexity of the question
            2. Provide any partial information you can confidently share based on the documentation
            3. Direct the user to contact support directly through the official channels
            4. Always include the contact information in your response
            5. Emphasize that it's better to share only verified information from the documentation
            6. Never invent information about the support process or how issues are handled
            7. If the user requests more than 5 items (questions, recommendations, steps, etc.), tell them: "Sorry, I can give you up to 5 items at a time. Can you narrow down your request?" and don't include any other content.
            
            DOCUMENTATION LINKS:
            When referring to specific products or features, always include a Markdown link to the relevant documentation. Use the format:

            If users ask for information that is not available in your current context, suggest them to:
            1. Use the search bar at the top of the documentation
            2. Navigate to the specific product section they need information about
            3. Provide the direct link to the documentation section if you know it

            Importantly, do not invent information. Only base your responses on the provided resources (docs).
            If you are asked something that is not found in the documentation or provided information, kindly respond that the documentation currently does not have this information, but you can inform support to add information about this.`
        }

        const systemMessage = {
            role: 'system',
            content: systemPrompt,
            isBot: true,
        }

        const initialMessage = {
            role: 'assistant',
            content: getInitialMessage(specialty),
            isBot: true,
        }

        setMessages([systemMessage, initialMessage])
    }

    const initializeChat = async () => {
        const newSpecialty = extractSpecialtyFromURL()
        const context = await importContext(newSpecialty.specialtyPart)

        let docs = null

        docs = context.docs

        await resetChat(newSpecialty.specialty)
        setLocale('es')

        initializeMessages(
            newSpecialty.specialty,
            docs,
            newSpecialty.specialty === 'general'
        )
    }

    const extractSpecialtyFromURL = () => {
        const path = window.location.pathname
        const parts = path.split('/')
        let specialtyPart = ''

        if (parts[1] === 'en' || parts[1] === 'es') {
            specialtyPart = parts[2]
        } else {
            specialtyPart = parts[1]
        }

        const specialtyMap = {
            payments: 'Payments',
            'payment-links': 'Payment Links',
            checkout: 'Checkout',
            microsites: 'Microsites',
            gateway: 'Gateway',
            core: 'Core',
            sdks: 'SDKs',
            'three-d-s-server': '3D Secure Server',
            ticket: 'Administración de Aerolineas PVA',
            'token-requestor': 'Token Requestor',
            'api-scudo': 'API Scudo',
            acs: 'ACS',
            'account-validator': 'Account Validator',
        }

        return {
            specialty: specialtyMap[specialtyPart] || 'general',
            specialtyPart: specialtyPart || 'general',
        }
    }

    const getInitialMessage = (newSpecialty) => {
        let initialMessage
        const isEnglish = window.location.pathname.includes('/en/')
        if (newSpecialty !== 'general' || newSpecialty !== '') {
            initialMessage = `¡Hola! Soy tu asistente de ProSalud. ¿Cómo puedo ayudarte hoy?`
        } else {
            initialMessage = `¡Hola! Bienvenido/a a ProSalud. ¿Buscas algún trámite en particular? Estoy aquí para ayudarte a encontrar la mejor solución para ti.`
        }

        return initialMessage
    }

    const resetChat = async (newSpecialty) => {
        try {
            setInputMessage('')
            setIsTyping(false)
            setShowSuggestions(true)
            setIsSuggestionsExpanded(true)
            setHasContext(false)
        } catch (error) {
            console.error('Error generating initial message:', error)
            setMessages([
                {
                    text: '¡Hola! Soy tu asistente de ProSalud. ¿Cómo puedo ayudarte hoy?',
                    isBot: true,
                },
            ])
        }
    }

    useEffect(() => {
        console.log('Mensajes actualizados:', messages)
    }, [messages])

    const startNewChat = async () => {
        const newSpecialty = extractSpecialtyFromURL()
        await resetChat(newSpecialty.specialty)
        initializeMessages(
            newSpecialty.specialty,
            allPageContents,
            null,
            newSpecialty.specialty === 'general'
        )
    }

    useEffect(() => {
        const handleURLChange = () => {
            const newSpecialty = extractSpecialtyFromURL()
            const newLocale = window.location.pathname.includes('/en/') ? 'en' : 'es'

            const specialtyChanged =
                newSpecialty.specialty !== specialty && specialty !== ''
            const localeChanged = newLocale !== locale

            setSpecialty(newSpecialty.specialty)
            setLocale(newLocale)

            if (specialtyChanged || localeChanged) {
                initializeChat()
            }
        }

        window.addEventListener('popstate', handleURLChange)

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    handleURLChange()
                }
            })
        })

        observer.observe(document, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('popstate', handleURLChange)
            observer.disconnect()
        }
    }, [specialty, locale])

    useEffect(() => {
        initializeChat()
            .then((r) => { })
            .finally(() => { })
    }, [])

    const toggleChat = () => {
        setIsFullscreen(false)
        setIsOpen(!isOpen)
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    const handleInputChange = (e) => {
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
        code({ node, inline, className, children, ...props }) {
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
        a({ node, children, href, ...props }) {
            // Determinar si es una URL relativa y agregar la URL base si es necesario
            const isRelative = href && href.startsWith('/') && !href.startsWith('//')
            const finalHref = isRelative
                ? `${window.location.origin}${href}`
                : href

            return (
                <a
                    href={finalHref}
                    className="text-primary-500 underline hover:text-primary-600 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                >
                    {children}
                </a>
            )
        },
        p: ({ children }) => <p className="my-1 leading-relaxed">{children}</p>,
        br: () => <br className="my-px" />,
        ul: ({ children }) => <ul className="ml-4 my-2 list-disc space-y-0.5">{children}</ul>,
        ol: ({ children }) => <ol className="ml-4 my-2 list-decimal space-y-0.5">{children}</ol>,
        li: ({ children }) => <li className="ml-1">{children}</li>,
        h1: ({ children }) => <h1 className="text-xl font-bold my-3">{children}</h1>,
        h2: ({ children }) => <h2 className="text-lg font-bold my-2">{children}</h2>,
        h3: ({ children }) => <h3 className="text-md font-semibold my-2">{children}</h3>,
        h4: ({ children }) => <h4 className="font-semibold my-1">{children}</h4>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-3 py-1 my-2 italic dark:border-gray-600">{children}</blockquote>,
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (inputMessage.trim() === '') return

        const text = inputMessage.trim();
        if (!text) return;

        const match = text.match(/dame\s+(\d+)\s+preguntas?/i);
        if (match) {
            const n = parseInt(match[1], 10);
            if (n > 5) {
                // Respuesta local sin invocar a OpenAI
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

        let chatMessages = null

        setMessages((prevMessages) => {
            chatMessages = [...prevMessages, newMessage]
            return chatMessages
        })
        setInputMessage('')
        setShowSuggestions(false)
        setIsSuggestionsExpanded(false)
        setHasContext(true)
        setIsTyping(true)

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
        }

        try {
            if (!allPageContents && specialty !== 'General') {
                console.error('Contenido de las páginas aún no está disponible.')
                return
            }

            // Agregar un mensaje temporal para el streaming con contenido vacío
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: '', isBot: true, isStreaming: true },
            ])

            const { textStream } = await streamText({
                model: openai('gpt-4.1-mini'),
                messages: chatMessages,
                maxTokens: 300,
            })

            let streamedText = ''

            for await (const delta of textStream) {
                streamedText += delta

                setMessages((prevMessages) => {
                    const updatedMessages = [...prevMessages]
                    // Actualizar el contenido del último mensaje
                    updatedMessages[updatedMessages.length - 1] = {
                        ...updatedMessages[updatedMessages.length - 1],
                        content: streamedText,
                    }
                    return updatedMessages
                })
            }

            // Actualizar el mensaje final
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages]
                updatedMessages[updatedMessages.length - 1] = {
                    role: 'assistant',
                    content: streamedText,
                    isBot: true,
                    isStreaming: false,
                }
                return updatedMessages
            })
        } catch (error) {
            console.error('Error generating response:', error)
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: "Lo siento, encontré un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.",
                    isBot: true,
                    isStreaming: false,
                },
            ])
        } finally {
            setIsTyping(false)
            setShowSuggestions(true)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage(e)
        }
    }

    const handleSuggestionClick = (suggestion) => {
        setInputMessage(suggestion)
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }

    const handleFeedback = (messageIndex, isPositive) => {
        console.log(
            `Feedback ${isPositive ? 'positivo' : 'negativo'
            } para el mensaje ${messageIndex}`
        )
    }

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } =
            messagesEndRef.current.parentElement
        const atBottom = scrollHeight - scrollTop - clientHeight < 10
        setAutoScroll(atBottom)
    }

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

    // Efecto para animar los puntos suspensivos durante la generación
    useEffect(() => {
        let interval
        if (isTyping) {
            interval = setInterval(() => {
                setTypingDots(prev => prev >= 3 ? 1 : prev + 1)
            }, 500)
        }
        return () => clearInterval(interval)
    }, [isTyping])

    // Renderizado del indicador de escritura
    const renderTypingIndicator = () => {
        const dots = '.'.repeat(typingDots)
        return (
            <div className="inline-flex items-center rounded-lg bg-white px-3 py-2.5 text-gray-700 shadow-md dark:bg-gray-700 dark:text-gray-200">

                <div className="ml-2 inline-flex h-5 items-center">
                    <span className="font-medium tracking-wide">
                        <span className="font-mono text-lg">{dots}</span>
                        <span className="invisible select-none">...</span>
                    </span>
                </div>
            </div>
        )
    }

    // Estilos CSS para el contenido Markdown
    const markdownStyles = `
    .markdown-content {
      line-height: 1.5;
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
    }
    .markdown-content li {
      margin-bottom: 0.25rem;
    }
    .markdown-content li:last-child {
      margin-bottom: 0;
    }
    .markdown-content pre {
      margin: 0.75rem 0;
    }
    .markdown-content blockquote {
      border-left: 3px solid #e2e8f0;
      padding-left: 1rem;
      font-style: italic;
      margin: 0.75rem 0;
    }
    .dark .markdown-content blockquote {
      border-left-color: #4a5568;
    }
    .markdown-content h1, .markdown-content h2, .markdown-content h3, 
    .markdown-content h4, .markdown-content h5, .markdown-content h6 {
      font-weight: 600;
      margin-top: 1.25rem;
      margin-bottom: 0.75rem;
    }
    .markdown-content h1 { font-size: 1.25rem; }
    .markdown-content h2 { font-size: 1.15rem; }
    .markdown-content h3 { font-size: 1.05rem; }
    .markdown-content h4, .markdown-content h5, .markdown-content h6 { font-size: 1rem; }
  `;

    return (
        <>
            <style jsx global>{markdownStyles}</style>
            {showChatbot && (
                <div
                    className={`fixed ${isFullscreen ? 'inset-0' : 'bottom-4 right-4'
                        } z-50`}
                >
                    <div
                        ref={chatContainerRef}
                        className={`
              chat-container overflow-hidden rounded-xl border-2 border-primary-200 bg-white shadow-2xl transition-all 
              duration-500 ease-in-out dark:border-primary-800 dark:bg-gray-900
              ${isOpen
                                ? 'scale-100 opacity-100'
                                : 'pointer-events-none scale-95 opacity-0'
                            }
              ${isFullscreen
                                ? 'fixed inset-0 m-0 flex flex-col rounded-none'
                                : 'fixed bottom-4 right-4 h-[32rem] w-full sm:w-96'
                            }
            `}
                    >
                        <div className="flex h-full flex-col">
                            <div
                                className={`flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 ${isFullscreen ? 'h-20' : ''
                                    }`}
                            >
                                <h2
                                    className={`flex items-center text-lg font-semibold text-gray-900 dark:text-white ${isFullscreen ? 'text-2xl' : ''
                                        }`}
                                >
                                    <img
                                        src={AVATAR_URL}
                                        alt="ProSalud Assistant Avatar"
                                        width={isFullscreen ? 56 : 40}
                                        height={isFullscreen ? 56 : 40}
                                        className="mr-4 rounded-full"
                                    />
                                    Asistente ProSalud
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={startNewChat}
                                        className="text-gray-500 transition-colors duration-300 hover:text-primary-500 focus:outline-none dark:text-gray-400 dark:hover:text-primary-400"
                                        title="Iniciar nuevo chat"
                                        aria-label="Iniciar nuevo chat"
                                    >
                                        <PlusCircle className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={toggleFullscreen}
                                        className="text-gray-500 transition-colors duration-300 hover:text-primary-500 focus:outline-none dark:text-gray-400 dark:hover:text-primary-400"
                                        title={
                                            isFullscreen
                                                ? 'Salir de pantalla completa'
                                                : 'Pantalla completa'
                                        }
                                        aria-label={
                                            isFullscreen
                                                ? 'Salir de pantalla completa'
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
                                        className="text-gray-500 transition-colors duration-300 hover:text-primary-500 focus:outline-none dark:text-gray-400 dark:hover:text-primary-400"
                                        title="Cerrar chat"
                                        aria-label="Cerrar chat"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <p
                                className={`border-b border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 ${isFullscreen ? 'py-3 text-base' : ''
                                    }`}
                            >
                                {specialty === 'general'
                                    ? 'Asistente General de ProSalud'
                                    : `Especialista en ${specialty}`}
                            </p>
                            <div
                                className={`relative flex flex-grow flex-col overflow-hidden ${isFullscreen ? 'mx-auto w-full max-w-4xl' : ''
                                    }`}
                            >
                                <div
                                    className={`flex-grow space-y-4 overflow-y-auto bg-gray-100 px-4 pb-8 pt-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 dark:bg-gray-900 dark:scrollbar-thumb-gray-700 ${isFullscreen ? 'px-6 text-lg' : ''
                                        }`}
                                    onScroll={handleScroll}
                                >
                                    {messages
                                        .filter((message) => message.role !== 'system')
                                        .map((message, index) => {
                                            // Si es un mensaje del bot con contenido vacío y está en proceso de streaming, no lo mostramos
                                            if (message.isBot && message.content === '' && isTyping) {
                                                return null;
                                            }

                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex 
                          ${message.isBot ? 'justify-start' : 'justify-end'} 
                        `}
                                                >
                                                    <div
                                                        className={`rounded-lg p-3 ${message.isBot
                                                            ? 'bg-white text-gray-900 shadow-md dark:bg-gray-700 dark:text-gray-100'
                                                            : 'bg-blue-500 text-white'
                                                            } max-w-[75%] overflow-x-auto transition-all duration-300 ease-out ${index === messages.length - 1
                                                                ? 'animate-fadeIn'
                                                                : ''
                                                            }`}
                                                    >

                                                        <div className="text-sm break-words markdown-content">
                                                            <ReactMarkdown
                                                                components={renderers}
                                                            >
                                                                {message.content}
                                                            </ReactMarkdown>
                                                        </div>

                                                        
                                                        {!message.isBot &&
                                                            index === messages.length - 1 &&
                                                            !isTyping && (
                                                                <div className="mt-1 flex justify-end">
                                                                    <Check className="h-4 w-4 text-gray-400" />
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    {/* Mostrar loader solo si está escribiendo y el último mensaje del bot está vacío */}
                                    {isTyping &&
                                        messages.length > 0 &&
                                        messages[messages.length - 1].isBot &&
                                        messages[messages.length - 1].content === '' && (
                                            <div className="flex justify-start">
                                                {renderTypingIndicator()}
                                            </div>
                                        )}
                                    <div ref={messagesEndRef} />
                                </div>
                                {showSuggestions && (
                                    <div
                                        ref={suggestionsRef}
                                        className={`absolute ${isFullscreen ? 'bottom-[72px]' : 'bottom-[58px]'
                                            } left-0 right-0 z-10 overflow-hidden border-t border-gray-200 bg-gray-100 transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-gray-800 ${isFullscreen ? 'mx-auto w-full max-w-4xl' : ''
                                            }`}
                                        style={{
                                            maxHeight: isSuggestionsExpanded
                                                ? `${suggestionsHeight}px`
                                                : '40px',
                                            transform: `translateY(${isSuggestionsExpanded
                                                ? '0'
                                                : `calc(100% - ${isFullscreen ? '60px' : '40px'})`
                                                })`,
                                        }}
                                    >
                                        <div
                                            className={`${!isSuggestionsExpanded ? '' : ''
                                                } flex h-10 items-center justify-between bg-gray-200 px-4 py-3 dark:bg-gray-700`}
                                        >
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Preguntas sugeridas
                                            </p>
                                            <button
                                                onClick={() =>
                                                    setIsSuggestionsExpanded(!isSuggestionsExpanded)
                                                }
                                                className="text-gray-600 transition-colors duration-300 hover:text-primary-500 focus:outline-none dark:text-gray-400 dark:hover:text-primary-400"
                                                aria-label={
                                                    isSuggestionsExpanded
                                                        ? 'Contraer sugerencias'
                                                        : 'Expandir sugerencias'
                                                }
                                            >
                                                {isSuggestionsExpanded ? (
                                                    <ChevronUp className="h-5 w-5" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                        <div ref={suggestionsContentRef} className="px-4 py-3">
                                            <div
                                                className={`${isFullscreen ? 'pb-8' : ''
                                                    } grid grid-cols-1 gap-3 sm:grid-cols-2`}
                                            >
                                                {suggestions.map((suggestion, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="truncate rounded-lg bg-white px-3 py-2 text-left text-sm text-gray-700 shadow-sm transition-colors duration-300 hover:bg-blue-100 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-blue-900"
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
                                    className={`relative z-20 border-t border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800 ${isFullscreen ? 'mx-auto w-full max-w-4xl p-4' : ''
                                        }`}
                                >
                                    <div className="flex items-end gap-2">
                                        <textarea
                                            ref={textareaRef}
                                            value={inputMessage}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            className={`flex-grow resize-none overflow-hidden rounded-lg border border-gray-300 bg-gray-100 p-2 text-sm text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-400 ${isFullscreen
                                                ? 'max-h-[200px] min-h-[3.5rem] p-3 text-base'
                                                : 'max-h-[150px] min-h-[2.5rem]'
                                                }`}
                                            placeholder="Escribe tu pregunta aquí..."
                                            rows={1}
                                            aria-label="Mensaje"
                                            disabled={isTyping}
                                        />
                                        <button
                                            type="submit"
                                            className={`transform rounded-lg bg-blue-500 p-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-400 focus:outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${isFullscreen ? 'p-4' : ''
                                                }`}
                                            disabled={isTyping || inputMessage.trim() === ''}
                                            title="Enviar mensaje"
                                            aria-label="Enviar mensaje"
                                        >
                                            <Send
                                                className={`${isFullscreen ? 'h-7 w-7' : 'h-5 w-5'}`}
                                            />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showChatbot && (
                <button
                    onClick={toggleChat}
                    className={`fixed bottom-4 right-4 z-10 transform rounded-full bg-blue-500 p-3
            text-white shadow-lg transition-all 
            duration-300 hover:rotate-3 hover:scale-110 hover:bg-blue-400 focus:outline-none
            ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          `}
                    title="Abrir chat de ayuda"
                    aria-label="Abrir chat de ayuda"
                >
                    <MessageCircle className="h-6 w-6" />
                </button>
            )}
        </>
    )
}