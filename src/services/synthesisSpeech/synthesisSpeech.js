const defaultOpts = { 
    volume: 1, 
    rate: 0.95, 
    pitch: 0.5,
    voice: 51, // Google US English...
    onstart: () => {},
    onend: () => {}
};

class SpeechSynthesis {
    constructor(speech = '', opts = defaultOpts) {
        
        this.speechToSay = new SpeechSynthesisUtterance(speech);
        
        speechSynthesis.addEventListener("voiceschanged", () => {
            const voices = speechSynthesis.getVoices();
            if(voices.length && voices.length > 0) {
                this.speechToSay.voice = voices?.[voice];
            }
        });

        const {volume, rate, pitch, voice, onstart, onend} = opts;
        
        this.speechToSay.volume = volume;
        this.speechToSay.rate = rate;
        this.speechToSay.pitch = pitch;
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