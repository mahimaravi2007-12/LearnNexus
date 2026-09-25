/**
 * LearnStream AI - Web Audio API Synthetic Sound Engine
 * Provides haptic-like audio feedback for quizzes, tests, voice search,
 * and completion fanfares without external audio file dependencies.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, type = "sine", duration = 0.15, gainVal = 0.1, delay = 0) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const startTime = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch (e) {
      console.warn("Audio play prevented:", e);
    }
  }

  playCorrect() {
    // Joyful ascending arpeggio (C5 -> E5 -> G5 -> C6)
    this.playTone(523.25, "sine", 0.12, 0.12, 0.0);
    this.playTone(659.25, "sine", 0.12, 0.12, 0.08);
    this.playTone(783.99, "sine", 0.15, 0.14, 0.16);
    this.playTone(1046.50, "triangle", 0.35, 0.16, 0.24);
  }

  playIncorrect() {
    // Low dual descending tone
    this.playTone(280, "sawtooth", 0.18, 0.06, 0.0);
    this.playTone(220, "sawtooth", 0.25, 0.06, 0.12);
  }

  playFanfare() {
    // Grand celebration chords
    const notes = [
      { f: 523.25, d: 0.15, t: 0.0 },
      { f: 659.25, d: 0.15, t: 0.12 },
      { f: 783.99, d: 0.18, t: 0.24 },
      { f: 1046.50, d: 0.45, t: 0.38 },
      { f: 1318.51, d: 0.60, t: 0.52 }
    ];
    notes.forEach(n => this.playTone(n.f, "sine", n.d, 0.15, n.t));
  }

  playClick() {
    this.playTone(800, "triangle", 0.04, 0.04, 0.0);
  }

  playVoiceBeep(start = true) {
    if (start) {
      this.playTone(440, "sine", 0.08, 0.1, 0.0);
      this.playTone(880, "sine", 0.14, 0.12, 0.09);
    } else {
      this.playTone(880, "sine", 0.08, 0.1, 0.0);
      this.playTone(440, "sine", 0.14, 0.1, 0.09);
    }
  }

  playTimerWarning() {
    this.playTone(950, "sine", 0.1, 0.08, 0.0);
    this.playTone(950, "sine", 0.1, 0.08, 0.2);
  }
}

window.soundEngine = new SoundEngine();
