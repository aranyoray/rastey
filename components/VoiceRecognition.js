import React, { useState, useEffect } from 'react';

const VoiceRecognition = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Browser does not support Speech Recognition.');
    }
  }, []);

  const startRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const stopRecognition = () => {
    window.webkitSpeechRecognition.stop();
    setIsRecording(false);
  };

  return (
    <div>
      <h2>Voice Recognition</h2>
      <button onClick={isRecording ? stopRecognition : startRecognition}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <p>{transcript ? `Transcript: ${transcript}` : 'No transcript available'}</p>
    </div>
  );
};

export default VoiceRecognition;