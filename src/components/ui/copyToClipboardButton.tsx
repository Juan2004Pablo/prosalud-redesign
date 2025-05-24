import React, { useState } from 'react';
import { Check, Clipboard } from 'lucide-react';

interface Props {
    textToCopy: string;
}

const CopyToClipboardButton: React.FC<Props> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // oculta el tooltip después de 2s
        } catch (err) {
            console.error('Error al copiar:', err);
        }
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleCopy}
                className="ml-2 p-1 rounded bg-primary text-white hover:bg-primary/90 transition-all"
                aria-label="Copiar al portapapeles"
            >
                {copied ? <Check size={16} /> : <Clipboard size={16} />}
            </button>

            {copied && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg animate-fadeIn z-50">
                    Copiado!
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                </div>
            )}
        </div>
    );
};

export default CopyToClipboardButton;
