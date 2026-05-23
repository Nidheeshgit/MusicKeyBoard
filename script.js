// ======================================
// CURRENT MODE
// ======================================

let currentMode = "piano";




// ======================================
// PENTATONIC MUSICAL KEY MAP
// ======================================

const keyMap = {

    // TOP ROW

    q: "C1",
    w: "D1",
    e: "E1",
    r: "G1",
    t: "A1",

    y: "C1",
    u: "D1",
    i: "E1",
    o: "G1",
    p: "A1",



    // MIDDLE ROW

    a: "C1",
    s: "D1",
    d: "E1",
    f: "G1",
    g: "A1",

    h: "C1",
    j: "D1",
    k: "E1",
    l: "G1",



    // BOTTOM ROW

    z: "A1",
    x: "G1",
    c: "E1",
    v: "D1",
    b: "C1",

    n: "A1",
    m: "G1"

};




// ======================================
// PIANO SAMPLER
// ======================================

const sampler = new Tone.Sampler({

    urls: {

        "C1": "c1.wav",
        "D1": "d1.wav",
        "E1": "e1.wav",
        "G1": "g1.wav",
        "A1": "a1.wav"

    },

    release: 1.8,

    baseUrl: "./samples/piano/"

}).toDestination();




// ======================================
// CHORD PLAYER
// ======================================

const chordPlayer = {

    q: new Audio("./samples/chords/C_maj_4_0.wav"),
    w: new Audio("./samples/chords/C_min_4_0.wav"),

    e: new Audio("./samples/chords/D_maj_4_0.wav"),
    r: new Audio("./samples/chords/D_min_4_0.wav"),

    t: new Audio("./samples/chords/E_maj_4_0.wav"),
    y: new Audio("./samples/chords/E_min_4_0.wav"),

    u: new Audio("./samples/chords/F_maj_4_0.wav"),
    i: new Audio("./samples/chords/F_min_4_0.wav"),

    o: new Audio("./samples/chords/G_maj_4_0.wav"),
    p: new Audio("./samples/chords/G_min_4_0.wav"),

    a: new Audio("./samples/chords/A_maj_4_0.wav"),
    s: new Audio("./samples/chords/A_min_4_0.wav"),

    d: new Audio("./samples/chords/D_dim_4_0.wav"),
    f: new Audio("./samples/chords/E_dim_4_0.wav"),

    g: new Audio("./samples/chords/F_dim_4_0.wav"),
    h: new Audio("./samples/chords/Cs_dim_4_0.wav")

};




// ======================================
// PRELOAD AUDIO
// ======================================

Object.values(chordPlayer).forEach(audio => {

    audio.preload = "auto";

    audio.volume = 0.9;

});




// ======================================
// LOAD AUDIO
// ======================================

Tone.loaded().then(() => {

    console.log("🎹 Piano Loaded");

});




// ======================================
// START AUDIO ENGINE
// ======================================

document.body.addEventListener("click", async () => {

    await Tone.start();

}, { once: true });




// ======================================
// ACTIVE KEYS
// ======================================

const activeKeys = {};




// ======================================
// PARTICLE EFFECT
// ======================================

function createParticle(x, y){

    const particle =
        document.createElement("div");

    particle.classList.add("particle");

    particle.style.left = x + "px";

    particle.style.top = y + "px";

    particle.style.background =
        `hsl(${Math.random()*60},100%,50%)`;

    document.body.appendChild(particle);

    setTimeout(() => {

        particle.remove();

    }, 1000);

}




// ======================================
// FIRE AMBIENT PARTICLES
// ======================================

setInterval(() => {

    const fire =
        document.createElement("div");

    fire.classList.add("particle");

    fire.style.left =
        Math.random() * window.innerWidth + "px";

    fire.style.top =
        window.innerHeight + "px";

    fire.style.background =
        `hsl(${Math.random()*40},100%,50%)`;

    fire.style.opacity = 0.5;

    fire.style.width =
        4 + Math.random() * 8 + "px";

    fire.style.height =
        fire.style.width;

    document.body.appendChild(fire);

    setTimeout(() => {

        fire.remove();

    }, 1200);

}, 120);




// ======================================
// SCREEN FLASH EFFECT
// ======================================

function screenFlash(){

    document.body.style.filter =
        "brightness(1.05)";

    setTimeout(() => {

        document.body.style.filter =
            "brightness(1)";

    }, 50);

}




// ======================================
// KEYDOWN EVENT
// ======================================

document.addEventListener("keydown", (event) => {

    const pressedKey =
        event.key.toLowerCase();



    // ==========================
    // MODE SWITCHING
    // ==========================

    if(pressedKey === "1"){

        currentMode = "piano";

        document.getElementById("modeBox").innerText =
            "🎹 MODE : PIANO";

        return;
    }


    if(pressedKey === "2"){

        currentMode = "chords";

        document.getElementById("modeBox").innerText =
            "🎼 MODE : CHORDS";

        return;
    }



    const note = keyMap[pressedKey];



    // PREVENT HOLD REPEAT

    if(activeKeys[pressedKey]){

        return;

    }



    // ==========================
    // VISUAL EFFECT
    // ==========================

    const visualKey =
        document.getElementById(`key-${pressedKey}`);

    if(visualKey){

        visualKey.classList.add("active");

        const rect =
            visualKey.getBoundingClientRect();

        createParticle(
            rect.left + rect.width / 2,
            rect.top
        );

    }



    // ==========================
    // RANDOM MOODS
    // ==========================

    const randomMood = [

        "✨ Smooth",
        "🔥 Energy",
        "🌊 Chill",
        "⚡ Fast",
        "🌌 Dream",
        "🎹 Harmony"

    ];


    const mood =
        randomMood[
            Math.floor(Math.random() * randomMood.length)
        ];



    document.getElementById("currentKey").innerText =
        `${pressedKey.toUpperCase()} • ${mood}`;



    // ==========================
    // PLAY AUDIO
    // ==========================

    if(note){

        screenFlash();



        const velocity =
            0.6 + Math.random() * 0.4;



        const randomTime =
            Tone.now() + Math.random() * 0.02;



        // ======================
        // PIANO MODE
        // ======================

        if(currentMode === "piano"){

            sampler.triggerAttack(
                note,
                randomTime,
                velocity
            );

        }



        // ======================
        // CHORD MODE
        // ======================

        else if(currentMode === "chords"){

            const chord =
                chordPlayer[pressedKey];

            if(chord){

                chord.currentTime = 0;

                chord.play();

            }

        }



        activeKeys[pressedKey] = true;

    }

});




// ======================================
// KEYUP EVENT
// ======================================

document.addEventListener("keyup", (event) => {

    const releasedKey =
        event.key.toLowerCase();

    const note =
        keyMap[releasedKey];



    // REMOVE ACTIVE EFFECT

    const visualKey =
        document.getElementById(`key-${releasedKey}`);

    if(visualKey){

        visualKey.classList.remove("active");

    }



    // SOFT RELEASE

    if(note && currentMode === "piano"){

        sampler.triggerRelease(
            note,
            Tone.now() + 0.05
        );

    }



    activeKeys[releasedKey] = false;

});