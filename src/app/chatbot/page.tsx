
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Loader2, User, ArrowLeft, Terminal, Cpu } from 'lucide-react';
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
      {/* Immersive Header */}
      <div className="h-20 border-b bg-background/60 backdrop-blur-2xl flex items-center justify-between px-8 shrink-0 z-30">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-primary/10 transition-all active:scale-90">
            <Link href="/">
                <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl shadow-inner border border-primary/20 animate-pulse">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase font-headline">CampusFusion<span className="text-primary">.AI</span></h1>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono font-bold">Neural Link Active</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs font-mono text-muted-foreground">
          <div className="flex flex-col items-end">
            <span className="opacity-50">ENGINE</span>
            <span className="text-primary">Gemini 1.5 Flash</span>
          </div>
          <div className="flex flex-col items-end border-l pl-8 border-border/50">
            <span className="opacity-50">STATUS</span>
            <span className="text-green-500">OPERATIONAL</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[60%] -right-[10%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[120px]" />
        </div>

        <ScrollArea className="flex-1 z-10" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
            {/* Greeting */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
                <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center border-2 border-primary/20 shadow-2xl">
                    <Bot className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter">How can I help you today?</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Ask me about live internships, upcoming events, or any coding doubts you have. I'm connected to the campus network.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                    {[
                        "What are the latest internships?",
                        "Tell me about upcoming events",
                        "How do I improve my resume?",
                        "Solve a Python coding problem"
                    ].map((suggestion) => (
                        <Button 
                            key={suggestion} 
                            variant="outline" 
                            className="h-auto py-4 px-6 justify-start text-left bg-card/50 hover:bg-primary/10 hover:border-primary/50 transition-all rounded-2xl"
                            onClick={() => setInput(suggestion)}
                        >
                            <span className="text-sm font-medium">{suggestion}</span>
                        </Button>
                    ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300',
                  message.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <Avatar className={cn(
                  "h-10 w-10 border-2 shrink-0 shadow-md",
                  message.role === 'user' ? "border-primary" : "border-primary/20"
                )}>
                  <AvatarFallback className={cn(
                    message.role === 'user' ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  )}>
                    {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    'rounded-2xl px-5 py-4 text-base shadow-sm border max-w-[85%] sm:max-w-[70%]',
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground border-primary/20' 
                      : 'bg-card/90 backdrop-blur-md border-border/50'
                  )}
                >
                  <ReactMarkdown className={cn(
                    "prose prose-sm max-w-none break-words leading-relaxed prose-headings:font-headline prose-pre:bg-black/90 prose-pre:p-4 prose-pre:rounded-xl",
                    message.role === 'user' ? "prose-invert" : "dark:prose-invert"
                  )}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            
            {isLoading && (
               <div className="flex items-start gap-5 animate-pulse">
                  <Avatar className="h-10 w-10 border-2 border-primary/20 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary"><Bot size={20} /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl bg-card/50 backdrop-blur-sm px-5 py-4 flex items-center gap-3 border border-border/50">
                      <Loader2 className="h-4 w-4 animate-spin text-primary"/>
                      <span className="font-mono text-xs uppercase tracking-widest font-bold">Thinking...</span>
                  </div>
               </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Interactive Bottom Area */}
        <div className="p-6 md:p-10 bg-gradient-to-t from-background via-background/95 to-transparent z-20">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="relative group transition-all duration-300 shadow-2xl rounded-3xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2.2rem] blur opacity-20 group-focus-within:opacity-100 transition duration-500" />
              <div className="relative flex items-center bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-3xl overflow-hidden focus-within:border-primary/50 transition-colors">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about internships, events, or code..."
                    className="flex-1 border-0 bg-transparent py-8 px-6 focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50"
                    disabled={isLoading}
                  />
                  <div className="pr-3">
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
            </div>
            <p className="mt-4 text-center text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-mono opacity-50">
              CampusFusion Intelligence Layer // Protocol 1.5.0
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
