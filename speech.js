/**
 * LearnStream AI - Voice Recognition & Audio Input Engine
 * Supports Web Speech API with animated visualizer fallback
 * and instant topic query execution.
 */

class VoiceSearchEngine {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.onResultCallback = null;
    this.onErrorCallback = null;
    this.onStateChangeCallback = null;

    this.initSpeechAPI();
  }

  initSpeechAPI() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;

        this.recognition.onstart = () => {
          this.isListening = true;
          if (window.soundEngine) window.soundEngine.playVoiceBeep(true);
          if (this.onStateChangeCallback) this.onStateChangeCallback(true);
        };

        this.recognition.onresult = (event) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
          }
          if (this.onResultCallback) {
            this.onResultCallback(transcript, event.results[0].isFinal);
          }
        };

        this.recognition.onerror = (event) => {
          console.warn("Speech recognition error:", event.error);
          this.stop();
          if (this.onErrorCallback) this.onErrorCallback(event.error);
        };

        this.recognition.onend = () => {
          this.isListening = false;
          if (window.soundEngine) window.soundEngine.playVoiceBeep(false);
          if (this.onStateChangeCallback) this.onStateChangeCallback(false);
        };
      } catch (e) {
        console.warn("Speech API initialization failed:", e);
      }
    }
  }

  start(onResult, onStateChange, onError) {
    this.onResultCallback = onResult;
    this.onStateChangeCallback = onStateChange;
    this.onErrorCallback = onError;

    if (this.recognition) {
      try {
        // Set language based on active app language
        const currentLang = document.documentElement.getAttribute("lang") || "en";
        const langMap = {
          en: "en-US",
          es: "es-ES",
          hi: "hi-IN",
          fr: "fr-FR",
          de: "de-DE",
          ja: "ja-JP"
        };
        this.recognition.lang = langMap[currentLang] || "en-US";
        this.recognition.start();
        return true;
      } catch (err) {
        console.warn("Speech start issue:", err);
      }
    }

    // Fallback simulation mode if browser doesn't have mic permission or Web Speech API
    this.simulateVoiceSearch(onResult, onStateChange);
    return false;
  }

  stop() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
    this.isListening = false;
    if (this.onStateChangeCallback) this.onStateChangeCallback(false);
  }

  simulateVoiceSearch(onResult, onStateChange) {
    this.isListening = true;
    if (window.soundEngine) window.soundEngine.playVoiceBeep(true);
    if (onStateChange) onStateChange(true);

    const sampleQueries = [
      "Neural Networks and Backpropagation",
      "Transformer Multi-Head Attention",
      "Dijkstra Algorithm and Heuristics",
      "Quantum Superposition and Bell States",
      "JavaScript Event Loop Microtasks"
    ];
    const picked = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];

    let current = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < picked.length) {
        current += picked[i];
        if (onResult) onResult(current, false);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.isListening = false;
          if (window.soundEngine) window.soundEngine.playVoiceBeep(false);
          if (onStateChange) onStateChange(false);
          if (onResult) onResult(picked, true);
        }, 500);
      }
    }, 45);
  }
}

window.voiceSearchEngine = new VoiceSearchEngine();
