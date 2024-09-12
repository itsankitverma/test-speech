'use client';
import Voice from "@react-native-voice/voice";
import { useEffect } from "react";

const VoiceInput = () => {
  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      console.log(event.value);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <div>
      <button onClick={() => Voice.start("en-US")}>Start Listening</button>
      <button onClick={() => Voice.stop()}>Stop Listening</button>
    </div>
  );
};

export default VoiceInput;
