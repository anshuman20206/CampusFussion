
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
    <div className="container mx-auto px-6 flex flex-1 flex-col py-6 max-h-[calc(100vh-160px)]">
      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardHeader className="text-center border-b py-4">
          <h1 className="text-2xl font-bold">CampusFusion AI</h1>
          <p className="text-sm text-muted-foreground">Real-time internships, events & code help</p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
          <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-primary/10 text-primary"><Bot size={18} /></AvatarFallback>
                </Avatar>
                <div className="rounded-2xl rounded-tl-none bg-muted p-4 text-sm shadow-sm">
                  <p>Hi! I'm your CampusFusion guide. Ask me about **latest internships**, **upcoming GDG events**, or any **programming questions** you have!</p>
                </div>
              </div>

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-4',
                    message.role === 'user' ? 'justify-end' : ''
                  )}
                >
                  {message.role === 'model' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-primary/10 text-primary"><Bot size={18} /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-2xl p-4 text-sm shadow-sm max-w-[85%]',
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-muted rounded-tl-none'
                    )}
                  >
                    <ReactMarkdown className="prose dark:prose-invert prose-sm max-w-none break-words">
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-secondary text-secondary-foreground"><User size={18} /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback className="bg-primary/10 text-primary"><Bot size={18} /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-2xl rounded-tl-none bg-muted p-4 text-sm flex items-center gap-3">
                        <Loader2 className="h-4 w-4 animate-spin text-primary"/>
                        <span className="animate-pulse">Consulting the campus grid...</span>
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 bg-background border-t">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-4xl mx-auto">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about internships, events, or code..."
                className="flex-1 py-6 rounded-xl"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" className="h-12 w-12 rounded-xl" disabled={isLoading || !input.trim()}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
