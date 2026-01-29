/**
 * ==========================================
 *        FOOTER ANIMATION CONTROLLER
 * ==========================================
 */

const FOOTER_CONFIG = {
    // Text for the middle trim-path animation (The "Separator" Event)
    animationText: "COMPOSE ◯ DESIGN ◯ DELIVER",

    // Sentences to scroll ONE BY ONE between animations.
    // The user can add infinite sentences here.
    scrollItems: [
        "<span style='background:#00ff00; color:black; padding:0 5px;'>CREATIVE CODING:</span> MERGING TECHNOLOGY AND ART TO CRAFT IMMERSIVE DIGITAL EXPERIENCES",
        "<span style='background:#00ff00; color:black; padding:0 5px;'>INTERFACE DESIGN:</span> SCULPTING PIXELS INTO INTUITIVE AND ENGAGING USER JOURNEYS",
        "<span style='background:#00ff00; color:black; padding:0 5px;'>FRONTEND ARCHITECTURE:</span> BUILDING SCALABLE AND ROBUST WEBSITES FOR THE MODERN WEB",
        "<span style='background:#00ff00; color:black; padding:0 5px;'>WEB ANIMATION:</span> BREATHING LIFE INTO STATIC LAYOUTS WITH FLUID MOTION RESPONSES",
        "<span style='background:#00ff00; color:black; padding:0 5px;'>USER EXPERIENCE:</span> EMPATHY DRIVEN DESIGN ENSURING SEAMLESS INTERACTION FOR ALL",
        "<span style='background:#00ff00; color:black; padding:0 5px;'>PERFORMANCE TUNING:</span> OPTIMIZING EVERY MILLISECOND TO DELIVER LIGHTNING FAST SPEEDS",
        "<span style='background:#00ff00; color:black; padding:0 5px;'>RESPONSIVE LAYOUTS:</span> ADAPTING CONTENT FLUIDLY ACROSS ALL DEVICE SCREENS AND ORIENTATIONS",
        "<span style='background:#00ff00; color:black; padding:0 5px;'>INNOVATION LAB:</span> PUSHING THE BOUNDARIES OF BROWSER CAPABILITIES AND AESTHETICS",
        "<span style='background:#00ff00; color:black; padding:0 5px;'>ACCESSIBILITY:</span> ENSURING INCLUSIVE WEB ACCESS FOR USERS OF ALL ABILITIES",
        "<span style='background:#00ff00; color:black; padding:0 5px;'>PROBLEM SOLVING:</span> TRANSFORMING COMPLEX REQUIREMENTS INTO ELEGANT DIGITAL SOLUTIONS"
    ],

    // Timings
    animationHoldDuration: 5000 // Time for the trim path sequence
};

class FooterAnimator {
    constructor() {
        this.currentIndex = 0;

        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.statusBox = document.querySelector('.status-box');
        this.scrollingContent = document.querySelector('.scrolling-content');

        if (!this.statusBox || !this.scrollingContent) {
            console.warn("FooterAnimator: Required elements not found.");
            return;
        }

        this.startSequence();
    }

    startSequence() {
        console.log("FooterAnimator: Starting Sequence");
        // Start scrolling immediately
        this.playScrollItem();
    }

    updateScrollContent(text) {
        // We duplicate the text to ensure the marquee effect works correctly with translateX(-50%)
        // The first copy scrolls off, the second copy finishes at the start position.
        // This triggers the 'animationiteration' event exactly when the "Loop" finishes.
        const repeatedText = `${text} &nbsp; &nbsp; &nbsp; &nbsp; ${text}`;

        this.scrollingContent.innerHTML = `
            <span class="scrolling-text-item">${repeatedText}</span>
        `;
    }

    playScrollItem() {
        // 1. Get current text
        const text = FOOTER_CONFIG.scrollItems[this.currentIndex];
        console.log(`FooterAnimator: Scrolling Item ${this.currentIndex}: ${text}`);

        // 2. Set Content
        this.updateScrollContent(text);

        // 3. Reset & Start Scroll Animation
        this.scrollingContent.style.display = 'flex';
        this.scrollingContent.classList.remove('hidden-scroll'); // Make visible

        // Reset animation to ensure it starts from 0%
        this.scrollingContent.style.animation = 'none';
        this.scrollingContent.offsetHeight; /* Trigger Reflow */

        // Apply animation (Duration comes from CSS usually, but we forced it here previously? 
        // User set 6s in CSS. Let's respect CSS or force it if desired.
        // To ensure consistency, we rely on the class but we can override if needed. 
        // BUT, CSS has 'infinite'. We want to catch the iteration.
        // If we set it here, we override the user's 6s edit. 
        // Better to respect CSS or use inline style to ensure we can catch it.
        // Let's use inline to strictly control the speed if needed, OR just inherit.
        // User changed CSS to 6s. Let's use that.
        this.scrollingContent.style.animation = ''; // Remove inline override to use CSS 6s
        // Wait, if I remove inline, it uses CSS 'scrollText 6s linear infinite'.
        // That is perfect.

        // 4. Listen for completion (One Loop)
        const handleIteration = (e) => {
            if (e.animationName === 'scrollText') {
                console.log("FooterAnimator: Loop Finished (Text reached left border).");
                this.scrollingContent.removeEventListener('animationiteration', handleIteration);

                // Advance Index
                this.currentIndex = (this.currentIndex + 1) % FOOTER_CONFIG.scrollItems.length;

                // Trigger Animation Separator
                this.runTrimPathAnimation();
            }
        };

        this.scrollingContent.addEventListener('animationiteration', handleIteration);
    }

    runTrimPathAnimation() {
        // Phase 2: Show Animation
        console.log("FooterAnimator: Playing Separator Animation");

        // 1. Hide Scroll Logic
        // We pause the animation so it doesn't jump while fading out
        this.scrollingContent.style.animationPlayState = 'paused';
        this.scrollingContent.classList.add('hidden-scroll'); // Opacity 0

        // After fade out (0.5s), hide display
        setTimeout(() => {
            this.scrollingContent.style.display = 'none';
        }, 500);

        // 2. Insert Animation UI
        const animContainer = document.createElement('div');
        animContainer.className = 'footer-anim-container';

        animContainer.innerHTML = `
            <div class="rush-line"></div>
            <div class="trim-wrapper">
                <svg class="trim-svg" viewBox="0 0 300 30">
                    <text x="50%" y="19" text-anchor="middle" class="trim-text">${FOOTER_CONFIG.animationText}</text>
                </svg>
            </div>
        `;

        this.statusBox.appendChild(animContainer);

        // 3. Wait for Animation to complete, then Resume
        setTimeout(() => {
            // Fade out animation container
            animContainer.style.opacity = '0';

            setTimeout(() => {
                // Remove container
                if (animContainer.parentNode) animContainer.parentNode.removeChild(animContainer);

                // Resume Scrolling (Next Item)
                this.playScrollItem();
            }, 500);

        }, FOOTER_CONFIG.animationHoldDuration);
    }
}

// Start
new FooterAnimator();
