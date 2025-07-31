import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Loader2, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useToast } from "@/components/ui/use-toast";

const ChatAssistant = ({ initialSystemMessage }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (initialSystemMessage) {
      setMessages([{ role: 'system', content: initialSystemMessage }]);
    }
  }, [initialSystemMessage]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  // ARREGLADO: Maneja solo strings como contenido y controla error
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userInput = input.trim();
    if (!userInput) return;
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setIsLoading(true);
    setInput('');
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });
      const data = await response.json();

      let content;
      if (data.respuesta && typeof data.respuesta === "string") {
        content = data.respuesta;
      } else if (data.error) {
        content = "Error: " + String(data.error);
      } else {
        content = "Hubo un error inesperado con la respuesta.";
      }

      setMessages((prev) => [...prev, { role: "assistant", content }]);
      setError(null);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hubo un error generando la respuesta." },
      ]);
      setError("Hubo un error generando la respuesta.");
    }
    setIsLoading(false);
  };

  const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';
    const isSystem = message.role === 'system';

    if (isSystem) {
      return (
        <div className="text-xs text-muted-foreground italic px-4 py-2 text-center">
          {String(message.content)}
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`flex items-end space-x-2 my-3 ${isUser ? 'justify-end' : ''}`}
      >
        {!isUser && (
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-bot.jpg" alt="AI Assistant" />
            <AvatarFallback><Bot size={18} /></AvatarFallback>
          </Avatar>
        )}
        <div
          className={`max-w-[70%] p-3 rounded-xl shadow-md ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-none'
              : 'bg-muted text-muted-foreground rounded-bl-none'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{String(message.content)}</p>
        </div>
        {isUser && (
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback><User size={18} /></AvatarFallback>
          </Avatar>
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] w-full max-w-2xl mx-auto bg-background border rounded-xl shadow-2xl overflow-hidden">
      <div className="p-4 border-b flex items-center space-x-3 bg-muted/50">
        <Bot size={24} className="text-primary" />
        <h2 className="text-lg font-semibold">{t('chat_assistant.title')}</h2>
      </div>

      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} />
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex items-center space-x-2 my-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-bot.jpg" alt="AI Assistant" />
              <AvatarFallback><Bot size={18} /></AvatarFallback>
            </Avatar>
            <div className="max-w-[70%] p-3 rounded-xl shadow-md bg-muted text-muted-foreground rounded-bl-none">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          </div>
        )}
        {error && (
          <div className="flex items-center space-x-2 my-3 p-3 bg-destructive/10 text-destructive rounded-lg">
            <AlertTriangle size={20} />
            <p className="text-sm">{error}</p>
          </div>
        )}
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t bg-muted/50">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat_assistant.input_placeholder')}
            className="flex-grow"
            disabled={isLoading}
            aria-label={t('chat_assistant.input_placeholder')}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            <Send size={20} />
            <span className="sr-only">{t('chat_assistant.send_button_aria')}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatAssistant;
