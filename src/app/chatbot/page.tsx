
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Loader2, Sparkles, User } from 'lucide-react';
import { getAiResponse } from './actions';
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
    <div className="fixed inset-0 z-50 bg-background flex flex-col pt-20">
      {/* Dynamic Header */}
      <div className="h-16 border-b bg-card/30 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">CampusFusion Intelligence</h1>
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">Live Sync Active</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground font-mono leading-none">SYSTEM STATUS</p>
            <p className="text-[10px] font-bold font-mono text-primary">GEMINI_1.5_FLASH_OK</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 relative">
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
            {/* Initial Greeting */}
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary font-bold"><Bot size={20} /></AvatarFallback>
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
                  message.role === 'user' ? 'flex-row-reverse' : ''
                )}
              >
                <Avatar className={cn(
                  "h-10 w-10 border-2 shrink-0",
                  message.role === 'user' ? "border-secondary" : "border-primary/20"
                )}>
                  <AvatarFallback className={cn(
                    message.role === 'user' ? "bg-secondary text-secondary-foreground" : "bg-primary/10 text-primary"
                  )}>
                    {message.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    'rounded-2xl p-5 text-sm shadow-sm max-w-[85%] border',
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none border-primary/50' 
                      : 'bg-muted/50 rounded-tl-none border-border/50'
                  )}
                >
                  <ReactMarkdown className="prose dark:prose-invert prose-sm max-w-none break-words leading-relaxed prose-p:leading-relaxed prose-pre:bg-black/50 prose-code:text-primary">
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            
            {isLoading && (
               <div className="flex items-start gap-4 animate-pulse">
                  <Avatar className="h-10 w-10 border-2 border-primary/20 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary"><Bot size={20} /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl rounded-tl-none bg-muted/50 p-5 text-sm flex items-center gap-3 border border-border/50">
                      <Loader2 className="h-4 w-4 animate-spin text-primary"/>
                      <span className="font-mono text-xs uppercase tracking-tighter">Processing Neural Request...</span>
                  </div>
               </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Full Width Floating Input */}
        <div className="p-6 bg-gradient-to-t from-background via-background/95 to-transparent border-t backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
            <div className="relative group">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about internships, code doubts, or events..."
                className="w-full py-7 px-6 rounded-2xl bg-muted/50 border-2 border-primary/10 focus-visible:border-primary/50 focus-visible:ring-0 transition-all text-base shadow-xl pr-16"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button 
                  type="submit" 
                  size="icon" 
                  className="h-12 w-12 rounded-xl shadow-lg hover:scale-105 transition-transform" 
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-3">
               <p className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-[0.2em]">
                 Encryption Protocol: AES-256
               </p>
               <p className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-[0.2em]">
                 Node: CF_ALPHA_1
               </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
