const defaultOpts = { 
    volume: 1, 
    rate: 0.95, 
    pitch: 0.6,
    onstart: () => {},
    onend: () => {}
};

export const initVoices = (language = "en-US") => {
    speechSynthesis.addEventListener("voiceschanged", () => {
        const voices = speechSynthesis.getVoices();
        if(voices.length && voices.length > 0) {
            window.__SPEECH_SYNTHESIS_VOICES__ = voices;
            window.__SELECTED_VOICE__ = voices.filter(({ lang }) => lang === language)[0]
        }
    });
}

class SpeechSynthesis {
    constructor(speech = '', opts = defaultOpts) {
        const {volume, rate, pitch, onstart, onend} = opts;
        this.speechToSay = new SpeechSynthesisUtterance(speech);
        
        this.speechToSay.volume = volume;
        this.speechToSay.rate = rate;
        this.speechToSay.pitch = pitch;
        this.speechToSay.voice = window.__SELECTED_VOICE__;
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
