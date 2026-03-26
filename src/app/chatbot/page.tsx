
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Loader2, Sparkles, User, ArrowLeft, Terminal } from 'lucide-react';
import { getAiResponse } from './actions';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

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
            setMessages((prev) => [...prev, { role: 'model', content: `**System Error:** ${response.message}` }]);
        } else {
            setMessages((prev) => [...prev, { role: 'model', content: response.content || "I couldn't generate a response." }]);
        }
    } catch (err) {
        setMessages((prev) => [...prev, { role: 'model', content: "Something went wrong with the connection. Please check your network and try again." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden">
      {/* Dynamic Immersive Header */}
      <div className="h-20 border-b bg-background/40 backdrop-blur-2xl flex items-center justify-between px-8 shrink-0 z-20">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/10 transition-colors">
            <Link href="/">
                <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl shadow-inner border border-primary/20">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight uppercase font-headline">CampusFusion<span className="text-primary">.AI</span></h1>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono font-bold">Protocol Active // Gemini 1.5</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-xs font-mono text-muted-foreground">
          <div className="flex flex-col items-end">
            <span className="opacity-50">LATENCY</span>
            <span className="text-primary">24ms</span>
          </div>
          <div className="flex flex-col items-end border-l pl-8 border-border/50">
            <span className="opacity-50">AUTH_STATUS</span>
            <span className="text-green-500">VERIFIED</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 relative">
        {/* Background Accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
        </div>

        <ScrollArea className="flex-1 z-10" ref={scrollAreaRef}>
          <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
            {/* Initial Greeting */}
            <div className="flex items-start gap-5 max-w-3xl">
              <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-xl shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary"><Bot size={24} /></AvatarFallback>
              </Avatar>
              <div className="rounded-3xl rounded-tl-none bg-card/80 backdrop-blur-md p-6 text-base shadow-xl border border-border/50 leading-relaxed">
                <p className="font-medium text-foreground/90">
                  Welcome to the **CampusFusion Core Intelligence**. I am connected to live campus streams including **internships**, **GDG events**, and **community updates**. 
                </p>
                <p className="mt-3 text-sm text-muted-foreground italic">How can I accelerate your journey today?</p>
              </div>
            </div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500',
                  message.role === 'user' ? 'flex-row-reverse ml-auto max-w-3xl' : 'max-w-4xl'
                )}
              >
                <Avatar className={cn(
                  "h-12 w-12 border-2 shrink-0 shadow-lg transition-transform hover:scale-110",
                  message.role === 'user' ? "border-primary" : "border-primary/20"
                )}>
                  <AvatarFallback className={cn(
                    message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  )}>
                    {message.role === 'user' ? <User size={24} /> : <Bot size={24} />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    'rounded-3xl p-6 text-base shadow-xl border transition-all duration-300',
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none border-primary/20' 
                      : 'bg-card/90 backdrop-blur-sm rounded-tl-none border-border/50'
                  )}
                >
                  <ReactMarkdown className={cn(
                    "prose prose-sm max-w-none break-words leading-relaxed prose-headings:font-headline prose-pre:bg-black/90 prose-pre:p-5 prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10",
                    message.role === 'user' ? "prose-invert" : "dark:prose-invert"
                  )}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            
            {isLoading && (
               <div className="flex items-start gap-5 animate-pulse max-w-3xl">
                  <Avatar className="h-12 w-12 border-2 border-primary/20 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary"><Bot size={24} /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-3xl rounded-tl-none bg-card/50 backdrop-blur-sm p-6 flex items-center gap-4 border border-border/50">
                      <Loader2 className="h-5 w-5 animate-spin text-primary"/>
                      <span className="font-mono text-xs uppercase tracking-widest font-bold">Processing Stream...</span>
                  </div>
               </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Full Width Bottom Input Area */}
        <div className="p-8 bg-gradient-to-t from-background via-background to-transparent z-20">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
            <div className="relative group transition-all duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[28px] blur opacity-25 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200" />
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message the intelligence... (e.g., 'What are the latest internships?')"
                className="relative w-full py-8 px-8 rounded-[24px] bg-card/80 backdrop-blur-xl border-2 border-border/50 focus-visible:border-primary/50 focus-visible:ring-0 transition-all text-lg shadow-2xl pr-20 placeholder:text-muted-foreground/50"
                disabled={isLoading}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Button 
                  type="submit" 
                  size="icon" 
                  className="h-14 w-14 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all bg-primary hover:bg-primary/90" 
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-6 w-6" />
                  <span className="sr-only">Send Message</span>
                </Button>
              </div>
            </div>
            <p className="mt-4 text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-mono opacity-50">
              CampusFusion AI may provide inaccurate info. Verify important details.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
