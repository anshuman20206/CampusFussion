'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User, Send, Code, FileText, Loader2 } from 'lucide-react';
import { getAiResponse } from './actions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getAiResponse(input);

    let assistantMessage: Message;
    if (response.type === 'error') {
      assistantMessage = { role: 'assistant', content: response.message };
    } else if (response.type === 'resume') {
       assistantMessage = { role: 'assistant', content: `**Resume/Interview Tips:**\n\n${response.data.tips}` };
    } else {
       assistantMessage = { role: 'assistant', content: `### Solution\n\`\`\`\n${response.data.solution}\n\`\`\`\n\n### Explanation\n${response.data.explanation}` };
    }
    
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="container flex h-[calc(100vh-4rem)] flex-col py-6">
      <Card className="flex flex-1 flex-col">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">Ask programming questions or for resume tips!</p>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><Bot size={18} /></AvatarFallback>
                </Avatar>
                <div className="rounded-lg bg-secondary p-4 text-sm max-w-[80%]">
                  <p>Hello! I'm the CampusConnect AI assistant. How can I help you today? Feel free to ask me a programming question or for advice on your resume.</p>
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
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-lg p-4 text-sm max-w-[80%]',
                      message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    )}
                  >
                    <ReactMarkdown className="prose dark:prose-invert prose-sm max-w-none">
                      {message.content}
                    </ReactMarkdown>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback><User size={18} /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                 <div className="flex items-start gap-4">
                    <Avatar className="h-8 w-8 border">
                      <AvatarFallback><Bot size={18} /></AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg bg-secondary p-4 text-sm max-w-[80%] flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                        <span>Thinking...</span>
                    </div>
                 </div>
              )}
            </div>
          </ScrollArea>
          <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-2 border-t pt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about React components, Python algorithms, or resume formatting..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
