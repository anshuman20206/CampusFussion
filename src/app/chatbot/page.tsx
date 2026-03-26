'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';
import { getAiResponse } from './actions';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model' | 'system';
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    const newHistory = [...messages, userMsg];
    
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
        const response = await getAiResponse(newHistory);

        if (response.type === 'error') {
            setMessages((prev) => [...prev, { role: 'model', content: `**Error:** ${response.message}` }]);
        } else {
            setMessages((prev) => [...prev, { role: 'model', content: response.content || "I couldn't generate a response." }]);
        }
    } catch (err) {
        setMessages((prev) => [...prev, { role: 'model', content: "Something went wrong with the network. Please try again." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 top-20 z-40 bg-background flex flex-col">
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b z-20 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">CampusFusion Assistant</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Real-time Data Sync Active</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground font-mono">Gemini 1.5 Flash Online</span>
          </div>
        </div>

        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto space-y-8">
            {/* Greeting */}
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary"><Bot size={22} /></AvatarFallback>
              </Avatar>
              <div className="rounded-2xl rounded-tl-none bg-muted/30 p-5 text-sm shadow-sm border border-border/50 max-w-[85%]">
                <p className="leading-relaxed">Greetings! I am the **CampusFusion Hub Intelligence**. I have live access to our **internships**, **GDG events**, and **announcements**. How can I assist your career or coding journey today?</p>
              </div>
            </div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300',
                  message.role === 'user' ? 'justify-end' : ''
                )}
              >
                {message.role === 'model' && (
                  <Avatar className="h-10 w-10 border-2 border-primary/20 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary"><Bot size={22} /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'rounded-2xl p-5 text-sm shadow-sm max-w-[85%] border',
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none border-primary/50' 
                      : 'bg-muted/50 rounded-tl-none border-border/50'
                  )}
                >
                  <ReactMarkdown className="prose dark:prose-invert prose-sm max-w-none break-words leading-relaxed">
                    {message.content}
                  </ReactMarkdown>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-10 w-10 border-2 border-secondary shrink-0">
                    <AvatarFallback className="bg-secondary text-secondary-foreground font-bold text-xs">YOU</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
               <div className="flex items-start gap-4 animate-pulse">
                  <Avatar className="h-10 w-10 border-2 border-primary/20 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary"><Bot size={22} /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl rounded-tl-none bg-muted/50 p-5 text-sm flex items-center gap-3 border border-border/50">
                      <Loader2 className="h-4 w-4 animate-spin text-primary"/>
                      <span className="font-mono text-xs uppercase tracking-tighter">Analyzing Request...</span>
                  </div>
               </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent z-20">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-4xl mx-auto relative group">
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about internships, events, or code doubts..."
                className="w-full py-8 px-6 rounded-2xl bg-muted/50 border-2 border-primary/10 focus-visible:border-primary/50 focus-visible:ring-0 transition-all text-base shadow-lg pr-16"
                disabled={isLoading}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Button 
                  type="submit" 
                  size="icon" 
                  className="h-12 w-12 rounded-xl shadow-md hover:scale-105 transition-transform" 
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </form>
          <p className="text-[10px] text-center mt-3 text-muted-foreground/40 font-mono uppercase tracking-widest">
            Gemini 1.5 Flash // Powered by CampusFusion AI Service
          </p>
        </div>
      </div>
    </div>
  );
}
