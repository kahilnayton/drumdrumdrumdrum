


// Global variables
let hh, clap, kick, snare, tom, chime1, chime2, chime3, chime4, soundFile;
let hPat, cPat, bPat, sPat;
let chime1Pat, chime2Pat, chime3Pat, chime4Pat;
let hPhrase, bPhrase, sPhrase, cPhrase;
let chime1Phrase, chime2Phrase, chime3Phrase, chime4Phrase;
let drums;
let bpmCTRL;
let beatLength;
let cellWidth
let cnv
let cursorPos
let button
let rSlider, gSlider, bSlider;
let followBeat
let reverb, sound
let color;
let props;
let w = 600;
let h = 400;
let n;


  preload = () => {
    soundFormats('wav');

    hh = loadSound('samples/hihat.mp3', () => { })
    clap = loadSound('samples/kick.mp3', () => { })
    kick = loadSound('samples/snare.mp3', () => { })
    snare = loadSound('samples/kick3.mp3', () => { })
    chime1 = loadSound('samples/chime1.mp3', () => { })
    chime2 = loadSound('samples/chime2.mp3', () => { })
    chime3 = loadSound('samples/chime3.mp3', () => { })
    chime4 = loadSound('samples/chime4.mp3', () => { })

  }

function windowResized() {
  console.log('meow')
    resizeCanvas(windowWidth, windowHeight)
  }

  function setup() {
    let cnv = createCanvas(windowWidth, windowHeight)
    //Create audio input
    drums = new p5.Part();
    cnv.mousePressed(canvasPressed)
    beatLength = 16
    cellWidth = width / beatLength
    cursorPos = 0

    preload(drums)


    hPat = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    cPat = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
    bPat = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0]
    sPat = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    chime1Pat = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    chime2Pat = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    chime3Pat = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    chime4Pat = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    followBeat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]


    hPhrase = new p5.Phrase('hh', (time) => { hh.play(time) }, hPat);
    cPhrase = new p5.Phrase('clap', (time) => { clap.play(time) }, cPat);
    bPhrase = new p5.Phrase('kick', (time) => { kick.play(time) }, bPat);
    sPhrase = new p5.Phrase('snare', (time) => { snare.play(time) }, sPat);
    chime1Phrase = new p5.Phrase('chime1', (time) => { chime1.play(time) }, chime1Pat);
    chime2Phrase = new p5.Phrase('chime2', (time) => { chime2.play(time) }, chime2Pat);
    chime3Phrase = new p5.Phrase('chime3', (time) => { chime3.play(time) }, chime3Pat);
    chime4Phrase = new p5.Phrase('chime4', (time) => { chime4.play(time) }, chime4Pat);


    drums.addPhrase(hPhrase)
    drums.addPhrase(cPhrase)
    drums.addPhrase(bPhrase)
    drums.addPhrase(sPhrase)
    drums.addPhrase(chime1Phrase)
    drums.addPhrase(chime2Phrase)
    drums.addPhrase(chime3Phrase)
    drums.addPhrase(chime4Phrase)

    drums.addPhrase('seq', sequence, followBeat)
    drums.onStep(() => {})

    
    drums.setBPM('70')
    
    drawMatrix()
    
  }
  
  
  draw = function () {
    
 

  }


// Check if samples are loaded and start or stop playback
  keyPressed = (e) => {
    e.preventDefault()
    if (key === " ") {
      if (
        hh.isLoaded() && 
        clap.isLoaded() && 
        kick.isLoaded() && 
        snare.isLoaded() && 
        chime1.isLoaded() && 
        chime2.isLoaded() && 
        chime3.isLoaded() && 
        chime4.isLoaded()) {
        if (!drums.isPlaying) {
          drums.loop()
        } else {
          drums.stop()
        }
      }
    }
  }

// Listening on all the grid squares 
  function canvasPressed() {
    let rowClicked = floor(8 * mouseY / height)
    let indexClicked = floor(16 * mouseX / width)
    if (rowClicked === 0) {
      hPat[indexClicked] = +!hPat[indexClicked]
    } else if (rowClicked === 1) {
      cPat[indexClicked] = +!cPat[indexClicked]
    } else if (rowClicked === 2) {
      bPat[indexClicked] = +!bPat[indexClicked]
    } else if (rowClicked === 3) {
      sPat[indexClicked] = +!sPat[indexClicked]
    } else if (rowClicked === 4) {
      chime1Pat[indexClicked] = +!chime1Pat[indexClicked]
    } else if (rowClicked === 5) {
      chime2Pat[indexClicked] = +!chime2Pat[indexClicked]
    } else if (rowClicked === 6) {
      chime3Pat[indexClicked] = +!chime3Pat[indexClicked]
    } else if (rowClicked === 7) {
      chime4Pat[indexClicked] = +!chime4Pat[indexClicked]
    }
    drawMatrix()
  }

  function drawMatrix() {
    background(300, 200)
    stroke('black')
    strokeWeight(2)
    fill('black')
  
// This draws the lines
    for (let i = 0; i < beatLength; i++) {
      line(i * width / beatLength, 0, i * width / beatLength, height)
    } for (let i = 0; i < 9; i++) {
      line(0, i * height / 8, width, i * height / 8)
    }
    noStroke()


// This draws the dots
    for (let i = 0; i < beatLength; i++) {
      if (hPat[i] === 1) {
        ellipse(i * cellWidth + 0.5 * cellWidth, height * 1 / 16, 25)
      }
      if (cPat[i] === 1) {
        ellipse(i * cellWidth + 0.5 * cellWidth, height * 3 / 16, 25)
      }
      if (bPat[i] === 1) {
        ellipse(i * cellWidth + 0.5 * cellWidth, height * 5 / 16, 25)
      }
      if (sPat[i] === 1) {
        ellipse(i * cellWidth + 0.5 * cellWidth, height * 7 / 16, 25)
      }
      if (chime1Pat[i] === 1) {
        ellipse(i * cellWidth + 0.5 * cellWidth, height * 9 / 16, 25)
      }
      if (chime2Pat[i] === 1) {
        ellipse(i * cellWidth + 0.5 * cellWidth, height * 11 / 16, 25)
      }
      if (chime3Pat[i] === 1) {
        ellipse(i * cellWidth + 0.5 * cellWidth, height * 13 / 16, 25)
      }
      if (chime4Pat[i] === 1) {
        ellipse(i * cellWidth + 0.5 * cellWidth, height * 15 / 16, 25)
      }
    }
  }

  sequence = (time, beatIndex) => {
    setTimeout(() => {
      drawMatrix()
      drawPlayhead(beatIndex)
    }, time * 1000)

  }

  function drawPlayhead(beatIndex) {
    stroke('red')
    fill(255, 0, 0, 30)
    rect((beatIndex - 1) * cellWidth, 0, cellWidth, height)
  }



