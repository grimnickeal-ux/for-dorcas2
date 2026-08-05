function startSurprise() {
    // 1. Play the background music
    const music = document.getElementById('bg-music');
    if (music) {
        music.volume = 0.2;
        music.play().catch(error => {
            console.log("Audio playback failed or was blocked by browser:", error);
        });
    }

    // 2. Reveal all hidden sections AND the scroll indicator
    document.getElementById('surprise').style.display = 'flex';
    document.getElementById('letter').style.display = 'flex';
    document.getElementById('memories').style.display = 'flex';
    document.getElementById('birthday').style.display = 'flex';
    document.getElementById('scroll-indicator').style.display = 'flex'; // 👈 Added this line

    // 3. Smoothly scroll down to the surprise section
    document.getElementById('surprise').scrollIntoView({ behavior: 'smooth' });

    // 4. Start all the visual functions
    startCountdown();
    typeLetter();
    startSlideshow();

    // 5. Spawn floating hearts every 300 milliseconds
    setInterval(createHeart, 300);
}

// 2. Countdown Timer Logic
function startCountdown() {
    // Set the birthday date (October 17 of the current year)
    const currentYear = new Date().getFullYear();
    let birthdayDate = new Date(`October 17, ${currentYear} 00:00:00`).getTime();

    setInterval(function() {
        const now = new Date().getTime();
        let distance = birthdayDate - now;

        // If the birthday has already passed this year, countdown to next year
        if (distance < 0) {
            birthdayDate = new Date(`October 17, ${currentYear + 1} 00:00:00`).getTime();
            distance = birthdayDate - now;
        }

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display results in the HTML
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }, 1000);
}

// 3. Typing Letter Logic
const letterText = "Dear Dorcas... 🌸 I wanted to make something completely unique just for you, because honestly, someone as special as you deserves more than just a basic birthday text. From the moment you walked into my life, you’ve managed to turn ordinary days into my absolute favorite moments. You have this effortless way of making me smile, and your energy is genuinely contagious. I love how sweet you are, but I also love that playful, flirty side of you that keeps me on my toes. 😉 For your birthday, I wanted to give you a little reminder of how much you mean to me and a safe place to hold all of our memories as we keep building them. You are beautiful, brilliant, and a little bit troublesome (the good kind, of course)—and I wouldn't change a single thing about you. Happy Birthday, beautiful. Let's make this year unforgettable. ❤️";
let index = 0;

function typeLetter() {
    if (index < letterText.length) {
        document.getElementById("typing").innerHTML += letterText.charAt(index);
        index++;
        setTimeout(typeLetter, 100); // Adjust typing speed here (lower = faster)
    }
}

// 4. Floating Hearts Logic
function createHeart() {
    const container = document.querySelector('.hearts');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart-element');

    // Randomly pick a heart emoji variant
    const heartTypes = ['❤️', '💖', '💝', '🌸', '💕'];
    heart.innerText = heartTypes[Math.floor(Math.random() * heartTypes.length)];

    // Randomize horizontal starting position (0% to 100% of screen width)
    heart.style.left = Math.random() * 100 + 'vw';

    // Randomize size (between 15px and 35px)
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';

    // Randomize animation duration (between 3 to 6 seconds)
    const duration = Math.random() * 3 + 3;
    heart.style.animationDuration = duration + 's';

    container.appendChild(heart);

    // Remove the heart from the DOM after its animation finishes
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}


// 5. Slideshow Logic
let currentSlideIndex = 0;

function startSlideshow() {
    const slides = document.querySelectorAll('.slide');

    // Safety check if there are no images
    if (slides.length === 0) return;

    // Run the slide change every 4000ms (4 seconds)
    setInterval(() => {
        // Remove 'active' class from current image
        slides[currentSlideIndex].classList.remove('active');

        // Move to the next index, loop back to 0 if at the end
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;

        // Add 'active' class to the new image
        slides[currentSlideIndex].classList.add('active');
    }, 4000);
}
