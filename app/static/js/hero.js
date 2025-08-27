document.addEventListener("DOMContentLoaded", function () {
    // =========================
    // HERO LOGO + SUBTITLE
    // =========================
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Pop in K
    tl.from(".k", {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });

    // Slide out "odaByte"
    tl.to(".rest", {
        width: "auto",
        duration: 1,
    }, "+=0.2");

    // Push logo up slightly
    tl.to(".logo", {
        y: "-30px",
        duration: 0.5
    }, ">");

    // Start typing subtitle
    tl.to({}, {
        duration: 0.2,
        onComplete: typeSubtitle
    });

    function typeSubtitle() {
        const subtitleEl = document.getElementById("subtitle-text");
        const cursorEl = document.getElementById("cursor");
        const subtitleText = "Designing responsive, high-performance websites that bring your vision to life online.";
        subtitleEl.textContent = "";
        cursorEl.style.visibility = "visible";

        let index = 0;
        const typingSpeed = 40;

        const typeInterval = setInterval(() => {
            subtitleEl.textContent += subtitleText[index];
            index++;
            if (index >= subtitleText.length) clearInterval(typeInterval);
        }, typingSpeed);
    }
});