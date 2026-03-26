'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import { getAiResponse } from './actions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
    <div className="flex flex-1 flex-col h-[calc(100vh-5rem)] w-full">
      <Card className="flex flex-1 flex-col overflow-hidden rounded-none border-0 shadow-none bg-background">
        <CardHeader className="text-center border-b py-4 shrink-0 bg-background/50 backdrop-blur-sm z-10">
          <h1 className="text-2xl font-bold tracking-tight">CampusFusion AI</h1>
          <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">Global Node Assistant // Live Data Enabled</p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden p-0 relative">
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="py-12 px-6 max-w-4xl mx-auto space-y-8">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary"><Bot size={22} /></AvatarFallback>
                </Avatar>
                <div className="rounded-2xl rounded-tl-none bg-muted/50 p-5 text-sm shadow-sm border border-border/50 max-w-[85%]">
                  <p className="leading-relaxed">Greetings! I am the **CampusFusion Hub Intelligence**. I have direct access to our local database for **internships**, **GDG events**, and **community news**. How can I assist your development journey today?</p>
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
                        <span className="font-mono text-xs uppercase tracking-tighter">Querying Central Grid...</span>
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-6 bg-gradient-to-t from-background via-background to-transparent border-t shrink-0">
            <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-4xl mx-auto relative group">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your query (e.g., 'What internships are open in AI?')"
                className="flex-1 py-7 px-6 rounded-2xl bg-muted/30 border-2 border-transparent focus-visible:border-primary/50 focus-visible:ring-0 transition-all text-base shadow-inner"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="h-14 w-14 rounded-2xl shadow-lg hover:scale-105 transition-transform" 
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-6 w-6" />
                <span className="sr-only">Send Message</span>
              </Button>
            </form>
            <p className="text-[10px] text-center mt-3 text-muted-foreground/60 font-mono uppercase tracking-widest">
              Gemini 2.0 Flash // Secure Channel Encrypted
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
