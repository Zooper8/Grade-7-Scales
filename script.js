// Pitch to frequency formula mapping
function noteToFrequency(note) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  // Normalize flats to sharps
  let formatted = note.replace('Db','C#').replace('Eb','D#').replace('Gb','F#').replace('Ab','G#').replace('Bb','A#');
  
  let noteName = formatted.replace(/[0-9]/g, '');
  let octave = parseInt(formatted.replace(/[^0-9]/g, '')) || 4;
  
  let index = notes.indexOf(noteName);
  if (index === -1) return 440; // Fallback to A4
  
  let midiNumber = index + (octave + 1) * 12;
  return 440 * Math.pow(2, (midiNumber - 69) / 12);
}

// Play practice scale sequence audio
function playPracticeSequence(variationNotes) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  variationNotes.forEach((note, step) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.frequency.value = noteToFrequency(note);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    // Play each note sequentially (0.5s duration)
    let startTime = audioCtx.currentTime + (step * 0.5);
    osc.start(startTime);
    gain.gain.setValueAtTime(0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);
    osc.stop(startTime + 0.5);
  });
}
