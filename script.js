// HUD Health.
var health = document.getElementById("health");
health.innerHTML = 20;

// HUD Suit.
var suit = document.getElementById("suit");
suit.innerHTML = 0;
var suitdiv = document.getElementById("saysuit");
var suitsound = document.getElementById("charger");

// Red bloody background and sfx.
var hit = document.getElementById("get");
var snd = document.getElementById("hl2sound");
snd.volume = 0.8;
var snd2 = document.getElementById("shotgun");
var snd3 = document.getElementById("deathsound");
snd3.volume = 0.2;
var snd4 = document.getElementById("hev");
var death = document.getElementById("death");

// The health-pack config.
const hlt = document.createElement("img");
hlt.src = "health.png";
hlt.height = "120";
hlt.style.position = "fixed";
hlt.style.margin = "0 auto";
hlt.style.zIndex = "999";
hlt.style.userSelect = "none";

// The suit battery config.
const st = document.createElement("img");
st.src = "250px-Item_battery.png";
st.height = "130";
st.style.position = "fixed";
st.style.margin = "0 auto";
st.style.zIndex = "999";
st.style.userSelect = "none";

// Gives the player 15 health and plays sfx.
function func_getHealth() {
    hlt.addEventListener('click', () => {
        health.innerHTML = Number(health.innerHTML) + 15;
        hlt.remove();
        snd.currentTime = 0;
        snd.play();
        func_checkHealth();
        func_damageColor();
    });
}

// Gives the battery to player and plays its sfx.
function func_getBattery() {
    st.addEventListener('click', () => {
        suit.innerHTML = Number(suit.innerHTML) + 15;
        func_checkSuit();
        st.remove();
        suitsound.currentTime = 0;
        suitsound.play();
        func_checkHealth();
    });
}

// Checks if the health is at 100 or 0 and stops it, plays HEV's "User Death Imminent" sound.
function func_checkHealth() {
    if (health.innerHTML > 0 && health.innerHTML <= 6) {
        snd4.play();
    }
    if (health.innerHTML >= 100) {
        health.innerHTML = 100;
    }
    if (health.innerHTML <= 0) {
        health.innerHTML = 0;
        death.style.display = "block";
        snd3.play();
        setTimeout(() => {
            snd2.volume = 0;
        }, 1500);
        setTimeout(() => {
            snd3.volume = 0;
        }, 5800);
        
    }
}

// Checks if the suit is above or below 100 or 0 and stops it, also hides the suit if its at 0.
function func_checkSuit() {
    func_checkHealth();
    if (suit.innerHTML >= 100) {
        suit.innerHTML = 100;
    }
    if (suit.innerHTML <= 0) {
        suitdiv.style.display = "none";
        suit.innerHTML = 0;
    }
    else {
        suitdiv.style.display = "block";
    }
}

// Creates the health pack and places it at a random place on the screen.
function func_createHealth() {
    hlt.style.top = Math.random() * window.innerHeight - 100 + 'px';
    hlt.style.left = Math.random() * window.innerWidth - 100 + 'px';
    document.body.appendChild(hlt);
}

// Creates the battery and places it at a random place on the screen.
function func_createBattery() {
    st.style.top = Math.random() * window.innerHeight - 100 + 'px';
    st.style.left = Math.random() * window.innerWidth - 100 + 'px';
    document.body.appendChild(st);
}

// Deals damage to player and blurs the health pack and suit battery like Half-Life 2.
function func_hitScan() {
    var damage = 20;
    hit.style.display = "block";
    snd2.currentTime = 0;
    snd2.play();
    health.style.animation = "glow 1s linear forwards";
    setTimeout(() => {
        hit.style.display = "none";
        health.style.animation = "none";
        suit.style.animation = "none";
    }, 1000);

    if (suit.innerHTML >= 1) {
        health.innerHTML = Number(health.innerHTML) - (damage * 0.2);
        suit.innerHTML = Number(suit.innerHTML) - (damage * 0.8);
        suit.style.animation = "glow 1s linear forwards";
        func_checkHealth();
        func_checkSuit();
        func_damageColor();
    }

    else {
        health.innerHTML = Number(health.innerHTML) - damage;
        func_checkHealth();
        func_checkSuit();
        func_damageColor();
    }
}

// Makes the HUD red if the player is below 25 health.
function func_damageColor() {
    if (health.innerHTML <= 25) {
        health.style.color = "red";
        document.getElementById("sayhealth").style.color = "red";
    }
    else {
        health.style.color = "yellow";
        document.getElementById("sayhealth").style.color = "yellow";
    }
}

// Shows red death screen when player dies, you can click on it to reload to try again.
death.addEventListener('click', () => {
    window.location.reload();
});

// Plays every function once website loads.
window.addEventListener('load', () => {
    func_getHealth();
    func_checkHealth();
    func_checkSuit();
    func_damageColor();
    func_getBattery();
    setInterval(() => {
        func_createHealth();
    }, 1000);
    setInterval(() => {
        func_createBattery();
    }, 1400);
    setInterval(() => {
        func_hitScan();
    }, 2200);
});
