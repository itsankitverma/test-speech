import React, { useState } from "react";
import { useVoiceToText } from "react-speakup";
import { Mic, MicOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const VoiceToTextComponent = () => {
  const { startListening, stopListening, transcript, reset } = useVoiceToText();
  const [isListening, setIsListening] = useState(false);

  const handleStartListening = () => {
    if (!isListening) {
      startListening();
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    }
  };

  const handleReset = () => {
    reset();
    setIsListening(false);
  };

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">
            Voice to Text
          </CardTitle>
          <CardDescription>
            Speak clearly and watch your words appear below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex justify-center space-x-4">
            <Button
              onClick={isListening ? handleStopListening : handleStartListening}
              variant={isListening ? "destructive" : "default"}
              size="lg"
              className="w-40"
            >
              {isListening ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" /> Stop
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" /> Start
                </>
              )}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="lg"
              className="w-40"
            >
              <Trash2 className="mr-2 h-5 w-5" /> Reset
            </Button>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <p className="text-lg text-gray-700 min-h-[100px]">
              {transcript || "Your spoken words will appear here..."}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default VoiceToTextComponent;
