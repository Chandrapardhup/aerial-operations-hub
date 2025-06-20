
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

interface ChatMessage {
  role: string;
  message: string;
  timestamp: string;
}

interface AIChatInterfaceProps {
  chatMessage: string;
  onChatMessageChange: (message: string) => void;
  chatHistory: ChatMessage[];
  onSendMessage: () => void;
}

export const AIChatInterface = ({ 
  chatMessage, 
  onChatMessageChange, 
  chatHistory, 
  onSendMessage 
}: AIChatInterfaceProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          AI Mission Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 bg-slate-700/30 rounded-lg p-4 overflow-y-auto space-y-2">
          {chatHistory.length === 0 ? (
            <p className="text-gray-400 text-center">Start a conversation with the AI assistant to control your drone...</p>
          ) : (
            chatHistory.map((msg, index) => (
              <div key={index} className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-600/20 ml-4' : 'bg-green-600/20 mr-4'}`}>
                <div className="flex justify-between">
                  <span className="font-semibold text-white">{msg.role === 'user' ? 'You' : 'AI Assistant'}</span>
                  <span className="text-xs text-gray-400">{msg.timestamp}</span>
                </div>
                <p className="text-gray-300 text-sm mt-1">{msg.message}</p>
              </div>
            ))
          )}
        </div>
        <div className="flex space-x-2">
          <Textarea
            value={chatMessage}
            onChange={(e) => onChatMessageChange(e.target.value)}
            placeholder="Tell the AI what you want the drone to do... (e.g., 'Take off and patrol the area')"
            className="bg-slate-700 border-slate-600 resize-none text-white"
            rows={2}
          />
          <Button 
            onClick={onSendMessage}
            className="bg-green-600 hover:bg-green-700 text-black font-medium"
            disabled={!chatMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
