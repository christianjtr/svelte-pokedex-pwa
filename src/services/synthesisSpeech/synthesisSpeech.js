const defaultOpts = { 
    volume: 1, 
    rate: 0.95, 
    pitch: 0.5,
    voice: 51, // Google US English...
    onstart: () => {},
    onend: () => {}
};

export const initVoices = () => {
    speechSynthesis.addEventListener("voiceschanged", () => {
        const voices = speechSynthesis.getVoices();
        if(voices.length && voices.length > 0) {
            window.__SPEECH_SYNTHESIS_VOICES__ = voices;
        }
    });
}

class SpeechSynthesis {
    constructor(speech = '', opts = defaultOpts) {
        const {volume, rate, pitch, voice, onstart, onend} = opts;
        const voices = window.__SPEECH_SYNTHESIS_VOICES__;
        
        this.speechToSay = new SpeechSynthesisUtterance(speech);
        
        this.speechToSay.volume = volume;
        this.speechToSay.rate = rate;
        this.speechToSay.pitch = pitch;
        this.speechToSay.voice = voices[voice];
        this.speechToSay.onstart = onstart();
        this.speechToSay.onend = onend();
    }

    setSpeechToSay(speech, opts) {
        const {
            volume = defaultOpts.volume, 
            rate = defaultOpts.rate, 
            pitch = defaultOpts.pitch, 
            onstart, 
            onend
        } = opts;
        
        this.speechToSay.text = speech;
        this.speechToSay.volume = volume;
        this.speechToSay.rate = rate;
        this.speechToSay.pitch = pitch;
        this.speechToSay.onstart = onstart;
        this.speechToSay.onend = onend;

        return this;
    }

    get() {
        return this.speechToSay;
    }
}

export default SpeechSynthesis;
