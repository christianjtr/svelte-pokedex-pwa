const getVoices = (voice = 0) => {
    return window.speechSynthesis.getVoices()[voice];
}

const defaultHandlers = { 
    onstart: () => {},
    onend: () => {}
};

const defaultOpts = { 
    volume: 1, 
    rate: 0.95, 
    pitch: 0.5
};

const createSynthesisSpeech = (speech, handlers = defaultHandlers, voice = 51, opts = defaultOpts) => {
    const { onstart, onend} = handlers;
    const {volume, rate, pitch} = opts;

    const speechToSay = new SpeechSynthesisUtterance(speech);
    speechToSay.volume = volume;
    speechToSay.rate = rate;
    speechToSay.pitch = pitch;
    speechToSay.voice = getVoices(voice); // Google US English voice...
    speechToSay.onstart = onstart;
    speechToSay.onend = onend;
    
    return speechToSay;
}

export {
    createSynthesisSpeech,
}
