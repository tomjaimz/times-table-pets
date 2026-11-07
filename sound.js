// Jemima's Magical Pet Academy - Web Audio Synthesizer
// Zero external audio dependencies; unlocks smoothly on first iPad touch.

class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  setEnabled(val) {
    this.enabled = !!val;
  }

  playTone(freq, type = "sine", duration = 0.15, startTimeOffset = 0, volume = 0.18, endFreq = null) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + startTimeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    }

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  // Subtle tactile tap for UI buttons
  tap() {
    this.playTone(520, "triangle", 0.055, 0, 0.1, 640);
  }

  // Ascending Duolingo-style chime that rises in pitch with current streak (1..10+)
  correct(streakStep = 1) {
    const scaleSemitones = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 24];
    const idx = Math.min(Math.max(0, streakStep - 1), scaleSemitones.length - 1);
    const baseFreq = 440 * Math.pow(2, scaleSemitones[idx] / 12);
    const fifthFreq = baseFreq * 1.25; // Major third/fifth sparkle

    this.playTone(baseFreq, "triangle", 0.14, 0, 0.2);
    this.playTone(fifthFreq, "sine", 0.22, 0.06, 0.22, fifthFreq * 1.02);
  }

  // Gentle encouraging "whoops" sound when streak resets to 0
  reset() {
    this.playTone(330, "sine", 0.16, 0, 0.18, 260);
    this.playTone(250, "triangle", 0.26, 0.12, 0.16, 195);
  }

  // Soft warning tick when < 1.0s left on timer
  tick() {
    this.playTone(780, "sine", 0.035, 0, 0.06, 720);
  }

  // Grand victory fanfare when reaching the end of the streak!
  victory() {
    const notes = [
      { f: 523.25, t: 0.0, d: 0.13 },  // C5
      { f: 659.25, t: 0.11, d: 0.13 }, // E5
      { f: 783.99, t: 0.22, d: 0.13 }, // G5
      { f: 1046.5, t: 0.34, d: 0.42 }  // C6
    ];
    notes.forEach((n) => {
      this.playTone(n.f, "triangle", n.d, n.t, 0.22);
      this.playTone(n.f * 1.5, "sine", n.d, n.t + 0.02, 0.09);
    });
  }

  // Magical sparkle when opening treasure chest or hatching a pet
  chestOpen() {
    const notes = [587.33, 739.99, 880, 1174.66, 1479.98, 1760];
    notes.forEach((f, i) => {
      this.playTone(f, "sine", 0.18, i * 0.055, 0.16, f * 1.05);
    });
  }
}

window.soundFX = new SoundManager();
