// Basic interaction script
// Implements the "Same page itself everything happens" logic with Dynamic JSON Loading

document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const mainContent = document.getElementById('mainContent');

    // Views
    const homeView = document.getElementById('home-view');
    const dynamicContainer = document.getElementById('dynamic-content-container');
    const mbImage = document.querySelector('.mb'); // The person image

    // Navigation Data
    const pages = [
        {
            id: 'home',
            title: 'UN <span class="reversed">R</span>ESTRICTED <span class="green-text">AREA</span>',
            headerTitle: 'HOME',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`
        },
        {
            id: 'about',
            title: 'ABOUT <span class="green-text">ME</span>',
            headerTitle: 'ABOUT',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
        },
        {
            id: 'works',
            title: 'SELECTED <span class="green-text">WORKS</span>',
            headerTitle: 'WORKS',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
        },
        {
            id: 'blog',
            title: 'MY <span class="green-text">BLOG</span>',
            headerTitle: 'BLOG',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
        },

        {
            id: 'vibe',
            title: 'VIBE <span class="green-text">ZONE</span>',
            headerTitle: 'VIBE',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12l-4.74-4.74 1.4-1.4 4.74 4.74"></path><path d="M12 9l4.74-4.74 1.4 1.4-4.74 4.74"></path></svg>`
        },
        {
            id: 'contact',
            title: 'CONTACT <span class="green-text">ME</span>',
            headerTitle: 'CONTACT',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
        }
    ];

    let currentPageIndex = 0;

    // UI Elements
    // Fixed: 'iconContainer' now refers to the WRAPPER (div) for animation
    const iconContainer = document.getElementById('iconContainer');
    // New: 'iconDisplaySpan' refers to the inner span for content updates
    const iconDisplaySpan = document.querySelector('.icon-display');

    const pageNameDisplay = document.getElementById('pageNameDisplay');
    const bootScreen = document.getElementById('boot-screen');
    const deviceFrame = document.querySelector('.device-frame');
    const homeBtn = document.getElementById('homeBtn');

    // --- Google Drive Modal Elements ---
    const driveModal = document.getElementById('driveModal');
    const driveModalContainer = document.querySelector('.drive-modal-container');
    const closeDriveBtn = document.getElementById('closeDriveBtn');
    const driveFrame = document.getElementById('driveFrame');
    // Actual folder ID provided by user
    const GDRIVE_ID = "1U3xUj-a0QxP720mXNEAFqrYHXrT_3xBV";


    // --- Content Fetching & Rendering ---



    async function loadContent(pageId) {
        dynamicContainer.innerHTML = '<div class="loading-text">LOADING DATA...</div>';

        switch (pageId) {
            case 'about':
                renderAbout();
                break;
            case 'works':
                renderWorks();
                break;
            case 'blog':
                renderBlog();
                break;
            case 'vibe':
                renderVibe();
                break;
            case 'contact':
                renderContact();
                break;
            default:
                break;
        }
    }

    // --- RENDERERS ---

    function renderFooter() {
        if (typeof FOOTER_DATA === 'undefined') return;
        const footerSpans = document.querySelectorAll('.scrolling-text-item');
        // Repeat text to ensure it spans across the screen (News Ticker style)
        // Creating a long string: "TEXT   TEXT   TEXT   TEXT"
        const repeatedText = Array(4).fill(FOOTER_DATA.text).join('&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;');

        footerSpans.forEach(span => {
            span.innerHTML = repeatedText; // Use innerHTML to parse spacers
        });
    }

    // Initialize Global Elements
    renderFooter();

    function renderAbout() {
        if (typeof ABOUT_DATA === 'undefined') {
            dynamicContainer.innerHTML = '<div class="loading-text">ABOUT DATA NOT FOUND</div>';
            return;
        }

        // Generate Paragraphs
        let paragraphsHTML = '';
        ABOUT_DATA.paragraphs.forEach(para => {
            paragraphsHTML += `<p>${para}</p>`;
        });

        dynamicContainer.innerHTML = `
            <div class="content-wrapper about-content">
                <h2>${ABOUT_DATA.title}</h2>
                <div class="scroll-wrapper">
                    ${paragraphsHTML}
                    <br>
                    <p><strong>${ABOUT_DATA.skillsTitle}</strong> ${ABOUT_DATA.skills}</p>
                    <br>
                    ${ABOUT_DATA.tagline ? `<br><p class="green-text" style="font-weight:bold; letter-spacing: 1px;">${ABOUT_DATA.tagline}</p>` : ''}
                    ${ABOUT_DATA.author ? `<br><p style="text-align: right; margin-top: 10px;">${ABOUT_DATA.author}</p>` : ''}
                </div>
                <div class="scifi-decoration">
                    <div class="line"></div>
              
                </div>
            </div>
        `;
        // dot also we can add <div class="dot"></div>
    }

    function renderWorks() {
        dynamicContainer.innerHTML = `
            <div class="content-wrapper works-content center-layout">
                <div class="circular-nav-container">
                    <svg class="rotating-text-svg" viewBox="0 0 200 200">
                        <defs>
                            <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                        </defs>
                        <text>
                            <textPath xlink:href="#circlePath" class="circle-text-path" startOffset="1%" text-anchor="middle">
                                <tspan fill="#ffffff">•</tspan>
                            </textPath>
                            <textPath xlink:href="#circlePath" class="circle-text-path" startOffset="26%" text-anchor="middle">
                                <tspan fill="#ffffff">SELECTED</tspan> WORKS
                            </textPath>
                            <textPath xlink:href="#circlePath" class="circle-text-path" startOffset="51%" text-anchor="middle">
                                <tspan fill="#ffffff">•</tspan>
                            </textPath>
                            <textPath xlink:href="#circlePath" class="circle-text-path" startOffset="76%" text-anchor="middle">
                                <tspan fill="#ffffff">SELECTED</tspan> WORKS
                            </textPath>
                        </text>
                    </svg>
                    <a href="javascript:void(0)" class="tap-here-btn" onclick="openDriveModal(this); return false;">
                        TAP<br>HERE
                    </a>
                </div>
            </div>
        `;
        // Inline onclick handles the event now, no external listener needed.
    }

    function renderVibe() {
        dynamicContainer.innerHTML = `
            <div class="vibe-content">
                <div class="game-container">
                    <!-- HUD Bar (Solid Top) -->
                    <div class="hud-bar">
                        <div class="score-display">
                            P: <span id="scoreVal">0</span> L: <span id="levelVal">1</span>
                        </div>
                        <div class="hud-controls">
                            <button id="manualPauseBtn" class="hud-btn" title="Pause">II</button>
                            <button id="manualStopBtn" class="hud-btn" title="Stop">X</button>
                        </div>
                    </div>

                    <!-- Canvas Wrapper (Game Area) -->
                    <div class="canvas-wrapper">
                        <canvas id="gameCanvas" width="320" height="215"></canvas>
                        <div id="gameOverlay" class="game-ui-layer">
                            <!-- Start Screen -->
                            <div id="startScreen" class="overlay-screen active">
                                <h2 style="color:#00ff00; font-size: 1.2rem; margin-bottom: 5px;">ROCKET DEFENSE</h2>
                                <button id="startGameBtn" class="game-btn">START</button>
                            </div>

                            <!-- Pause Screen -->
                            <div id="pauseScreen" class="overlay-screen">
                                <h2>PAUSED</h2>
                                <button id="resumeGameBtn" class="game-btn">RESUME</button>
                                <button id="quitGameBtn" class="game-btn">QUIT</button>
                            </div>

                            <!-- Game Over Screen -->
                            <div id="gameOverScreen" class="overlay-screen">
                                <h2 style="color:red; font-size: 1.2rem;">FAILED</h2>
                                <p>SCORE: <span id="finalScore">0</span></p>
                                <button id="restartGameBtn" class="game-btn">RETRY</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="game-controls-pad">
                    <div class="d-pad">
                        <button id="btnUp" class="ctrl-btn">▲</button>
                        <button id="btnDown" class="ctrl-btn">▼</button>
                    </div>
                    <!-- System controls moved to HUD -->
                    <div class="action-pad">
                        <button id="btnFire" class="ctrl-btn fire-btn">FIRE</button>
                    </div>
                </div>
            </div>
        `;
        // Initialize Game Logic
        setTimeout(initGameLogic, 100);
    }


    function renderBlog() {
        if (typeof BLOG_DATA === 'undefined') {
            dynamicContainer.innerHTML = '<div class="loading-text">BLOG DATA NOT FOUND</div>';
            return;
        }

        let blogHTML = `<div class="content-wrapper blog-content">`;

        // 1. Sort by Date (Latest First)
        // Creating a sorted copy to avoid mutating original
        const sortedPosts = [...BLOG_DATA].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        // 2. Loop through Sorted Data
        sortedPosts.forEach(post => {
            // Thumbnails removed as per user request
            blogHTML += `
                <div class="blog-card" onclick="openBlogModal(${post.id}, this)">
                    <div class="blog-info">
                        <!-- Show CATEGORY instead of Date, Uppercase enforced -->
                        <div class="blog-date" style="text-transform: uppercase;">${post.category || 'GENERAL'}</div>
                        <div class="blog-title">${post.title}</div>
                        <div class="blog-preview">${post.preview}</div>
                    </div>
                </div>
            `;
        });

        blogHTML += `</div>`;
        dynamicContainer.innerHTML = blogHTML;
    }

    function renderContact() {
        dynamicContainer.innerHTML = `
            <div class="content-wrapper contact-content" style="display:flex; flex-direction:column; justify-content:center; height:100%; text-align: left;">
                
                <!-- Slightly smaller header (80% of original), LEFT ALIGNED -->
                <h2 style="font-size:1.5rem; margin-bottom:5px; text-align: left; width: 100%;">ESTABLISH <span class="green-text">CONNECTION</span></h2>
                
                <!-- Smaller paragraph, CSS Class Controlled, Custom Line Breaks -->
                <p class="contact-text-block">
                    Available for <i>freelance opportunities and collaborations.</i> And also for<span style='background: black; color: #00ff00; padding: 0 5px;'>any doubts, free to connect.</span>
                </p>

                <!-- OPEN FORM BUTTON -->
                <div style="margin-bottom:20px; text-align:left;">
                    <a href="#" class="submit-btn" onclick="event.preventDefault(); openContactModal(this);" style="display:inline-block; text-decoration:none; padding:10px 30px;">
                        INITIATE TRANSMISSION
                    </a>
                </div>

                <!-- Icons Row -->
                <div class="social-icons-row" style="display:flex; gap:30px; justify-content:flex-start; align-items:center;">
                    
                    <!-- MAIL -->
                    <a href="mailto:hello@mathewsb.in" class="icon-link" aria-label="Email">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </a>

                    <!-- LINKEDIN -->
                    <a href="https://www.linkedin.com/in/ᴍᴀᴛʜᴇᴡꜱ-ʙ-52a623395" target="_blank" class="icon-link" aria-label="LinkedIn">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>



                </div>

                <!-- Ambient "Cyber Fly" -->
                <div class="cyber-fly" id="cyberFly">
                    <span class="buzz-text">bzz..</span>
                </div>
            </div>
        `;

        // Start Insect AI
        setTimeout(() => {
            const fly = document.getElementById('cyberFly');
            const container = document.querySelector('.contact-content');
            if (!fly || !container) return;

            // Targets to land on: Headers, Paragraphs, Icons
            const targets = container.querySelectorAll('h2, p, .icon-link, .submit-btn');

            let isLanded = false;

            function moveFly() {
                // Return if user navigated away (fly removed)
                if (!document.getElementById('cyberFly')) return;

                if (isLanded) {
                    // Take off!
                    isLanded = false;
                    fly.classList.remove('landed');
                    fly.classList.add('buzzing'); // Buzz when taking off
                    setTimeout(() => fly.classList.remove('buzzing'), 500);

                    // Fly to random spot first
                    const x = Math.random() * (container.clientWidth - 20);
                    const y = Math.random() * (container.clientHeight - 20);
                    animateTo(x, y, 1000 + Math.random() * 1000, moveFly);
                } else {
                    // Decide: Land or Fly around?
                    // 40% chance to land if targets exist
                    const wantToLand = Math.random() < 0.4 && targets.length > 0;

                    if (wantToLand) {
                        // Pick random target
                        const target = targets[Math.floor(Math.random() * targets.length)];
                        // Get relative coordinates
                        const contRect = container.getBoundingClientRect();
                        const tgtRect = target.getBoundingClientRect();

                        // Calculate relative position within container
                        const relL = tgtRect.left - contRect.left;
                        const relT = tgtRect.top - contRect.top;

                        // Pick random spot ON the element
                        const landX = relL + Math.random() * tgtRect.width;
                        const landY = relT + Math.random() * tgtRect.height;

                        // Move there
                        animateTo(landX, landY, 1500, () => {
                            // Landed!
                            isLanded = true;
                            fly.classList.add('landed');

                            // Maybe buzz while sitting?
                            if (Math.random() < 0.5) {
                                setTimeout(() => {
                                    if (isLanded) fly.classList.add('buzzing');
                                }, 500);
                                setTimeout(() => {
                                    fly.classList.remove('buzzing');
                                }, 1500);
                            }

                            // Sit for 2-4 seconds then move
                            setTimeout(moveFly, 2000 + Math.random() * 2000);
                        });
                    } else {
                        // Just fly somewhere
                        const x = Math.random() * (container.clientWidth - 20);
                        const y = Math.random() * (container.clientHeight - 20);
                        animateTo(x, y, 1000 + Math.random() * 2000, moveFly);
                    }
                }
            }

            function animateTo(x, y, duration, callback) {
                // Calculate rotation to face direction
                const currentLeft = parseFloat(fly.style.left) || 0;
                const currentTop = parseFloat(fly.style.top) || 0;

                const deltaX = x - currentLeft;
                const deltaY = y - currentTop;
                const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90; // +90 because our bug faces up/down? or adjustment. 
                // CSS Rotate: 0deg is usually up or right. Let's assume standard rotation.
                // Actually my CSS wing flutter is scaleY, which implies body is vertical. 
                // Let's set rotation.

                fly.style.transition = `top ${duration}ms ease-in-out, left ${duration}ms ease-in-out, transform 0.5s linear`;
                fly.style.left = `${x}px`;
                fly.style.top = `${y}px`;
                fly.style.transform = `rotate(${angle}deg)`;

                setTimeout(callback, duration);
            }

            // Initial Start
            moveFly();

        }, 100);
    }

    // --- View Controller ---

    function updateContent() {
        const page = pages[currentPageIndex];
        const audioPlayerContainer = document.querySelector('.centered-audio-player');

        // 1. Update Header Info
        if (pageNameDisplay) pageNameDisplay.textContent = page.headerTitle;
        if (iconDisplaySpan) iconDisplaySpan.innerHTML = page.icon;

        // 1.5. Toggle No-Scroll for Vibe/Contact
        const pageId = page.id;
        if (pageId === 'vibe' || pageId === 'contact') {
            dynamicContainer.classList.add('noscroll-container');
        } else {
            dynamicContainer.classList.remove('noscroll-container');
        }

        // 2. Toggle Views
        if (page.id === 'home') {
            // SHOW HOME
            document.body.classList.remove('hide-audio'); // Ensure audio is visible
            document.body.classList.remove('works-mode'); // Remove works mode
            homeView.classList.remove('hidden-view');
            homeView.classList.add('active-view');
            dynamicContainer.classList.remove('active-view');
            dynamicContainer.classList.add('hidden-view');

            // Show Person Image on Home
            if (mbImage && document.body.classList.contains('intro-finished')) {
                // Replay entry animation when coming back to home
                playHeroEntry();
            }

            // Hide Home Button via CSS or JS
            if (homeBtn) homeBtn.style.display = 'none';

            // FULL AUDIO PLAYER
            if (audioPlayerContainer) {
                audioPlayerContainer.classList.remove('minimal-player');
                // audioPlayerContainer.style.display = 'flex'; // Handled by CSS class removal
            }

        } else if (page.id === 'works') {
            // SPECIAL CASE: User wants NO audio player stuff on Works page
            // document.body.classList.add('hide-audio'); // REMOVED: keep visible for pause button
            document.body.classList.add('works-mode'); // Specific class for Works page styling (e.g., hide scrollbar)

            // SHOW DYNAMIC
            homeView.classList.remove('active-view');
            homeView.classList.add('hidden-view');
            dynamicContainer.classList.remove('hidden-view');
            dynamicContainer.classList.add('active-view');

            // Load specific data
            loadContent(page.id);

            // Show Person Image on other pages too (Ghost Effect)
            if (mbImage) {
                mbImage.style.display = 'block';
            }

            // Show Home Button
            if (homeBtn) homeBtn.style.display = 'block';

        } else {
            // SHOW DYNAMIC (About, Contact)
            document.body.classList.remove('hide-audio'); // Ensure audio is visible
            document.body.classList.remove('works-mode'); // Remove works mode

            homeView.classList.remove('active-view');
            homeView.classList.add('hidden-view');
            dynamicContainer.classList.remove('hidden-view');
            dynamicContainer.classList.add('active-view');

            // Load specific data
            loadContent(page.id);

            // Show Person Image on other pages too (Ghost Effect)
            if (mbImage) {
                mbImage.style.display = 'block';
                // Ensure opacity is 1 so animation controls it, or let animation handle it.
                // We don't force opacity 0 here anymore.
            }

            // Show Home Button
            if (homeBtn) homeBtn.style.display = 'block';

            // MINIMAL AUDIO PLAYER
            if (audioPlayerContainer) {
                audioPlayerContainer.classList.add('minimal-player');
                // audioPlayerContainer.style.display = 'flex'; // Handled by CSS class removal
            }
        }

        console.log(`Navigated to page ${currentPageIndex}: ${page.title}`);
    }

    // --- Unified Transition Helper ---
    function transitionView(updateCallback) {
        // 1. Fade Out Current View
        // Find the currently active view (Home or Dynamic)
        const currentActive = document.querySelector('.active-view');

        if (currentActive) {
            // We use inline style or class. Since .active-view has opacity 1,
            // we can just force opacity 0 inline to trigger transition.
            currentActive.style.opacity = '0';
        }

        if (pageNameDisplay) pageNameDisplay.classList.add('fade-out');
        if (iconDisplaySpan) iconDisplaySpan.classList.add('fade-out');

        // 2. Wait for transition (400ms matches CSS)
        setTimeout(() => {
            // 3. Update Content (This swaps .active-view / .hidden-view classes)
            // The new view will get .active-view (Opacity 1). 
            // We need to make sure the Old View (if it stays same element) resets?
            // But updateContent swaps elements entirely usually.

            updateCallback();

            // Clean up the manual opacity override we set on the OLD active element
            if (currentActive) {
                currentActive.style.opacity = '';
            }

            // The NEW active view (set by updateCallback) will have .active-view class.
            // CSS handles the fade-in (opacity 0 -> 1).
            // We might need to ensure the browser registers the state change.

            if (pageNameDisplay) pageNameDisplay.classList.remove('fade-out');
            if (iconDisplaySpan) iconDisplaySpan.classList.remove('fade-out');

            // Ensure MainContent is visible (just in case)
            mainContent.style.opacity = '1';

        }, 400);
    }

    function handleNavigation(direction) {
        // Cleanup Vibe Game if leaving it
        if (pages[currentPageIndex].id === 'vibe') {
            if (typeof cleanupGame === 'function') cleanupGame();
        }

        transitionView(() => {
            if (direction === 'next') {
                currentPageIndex = (currentPageIndex + 1) % pages.length;
            } else {
                currentPageIndex = (currentPageIndex - 1 + pages.length) % pages.length;
            }
            updateContent();
        });
    }


    // --- Event Listeners ---

    if (nextBtn) nextBtn.addEventListener('click', () => handleNavigation('next'));
    if (prevBtn) prevBtn.addEventListener('click', () => handleNavigation('prev'));

    if (homeBtn) {
        homeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Cleanup Vibe Game if leaving it
            if (pages[currentPageIndex].id === 'vibe') {
                if (typeof cleanupGame === 'function') cleanupGame();
            }

            transitionView(() => {
                currentPageIndex = 0;
                // Force reset for home
                if (dynamicContainer) dynamicContainer.innerHTML = '';
                updateContent();
            });
        });
    }


    // --- Animation Helper ---
    function playHeroEntry() {
        if (!mbImage) return;

        // Reset Ghost
        mbImage.classList.remove('animate-ghost');

        // 0. Disable transition for instant reset
        mbImage.style.transition = 'none';

        // 1. Set Initial State via Class
        mbImage.classList.add('slide-up-initial');
        mbImage.style.display = 'block';
        mbImage.style.opacity = ''; // CLEAR INLINE OPACITY so CSS can take over

        // 2. Force Browser Reflow (Commit the "Jump to Start" state)
        void mbImage.offsetWidth;

        // 3. Re-enable transitions (Clear inline override)
        mbImage.style.transition = '';

        // 4. Force another Reflow (Ensure browser knows transition is active again)
        void mbImage.offsetWidth;

        // 5. Trigger Animation (Slide Up)
        mbImage.classList.remove('slide-up-initial');

        // Wait for fade-in (2s) to finish before ghosting - transition time is 2s (css)
        setTimeout(() => {
            mbImage.classList.add('animate-ghost');
        }, 2000);
    }

    // --- Boot Sequence ---
    const runBootSequence = () => {
        if (!bootScreen) return;
        bootScreen.style.display = 'flex';
        void bootScreen.offsetWidth;
        bootScreen.style.opacity = '1';
        document.body.classList.remove('intro-finished');
        if (deviceFrame) deviceFrame.classList.remove('intro-finished');
        if (mbImage) {
            mbImage.style.opacity = '0';
            mbImage.style.display = 'none';
        }

        setTimeout(() => {
            bootScreen.style.opacity = '0';
            setTimeout(() => {
                bootScreen.style.display = 'none';
                if (deviceFrame) {
                    deviceFrame.classList.add('glitch-blast');
                    setTimeout(() => {
                        deviceFrame.classList.remove('glitch-blast');
                        // Show person on ALL pages
                        // Show person on ALL pages
                        if (mbImage) {
                            setTimeout(() => {
                                playHeroEntry();
                            }, 200); // Reduced delay for faster appearance
                        }
                        if (deviceFrame) deviceFrame.classList.add('intro-finished');
                        document.body.classList.add('intro-finished');
                    }, 500);
                }
            }, 500);
        }, 2500);
    };

    // Initial Load
    updateContent(); // Set initial state
    if (bootScreen) runBootSequence();


    // --- Advanced Audio Controls (Restored) ---
    const bgAudio = document.getElementById('bg-audio');

    if (bgAudio) {
        // UI Elements
        const playPauseBtn = document.getElementById('playPauseBtn');
        const prevTrackBtn = document.getElementById('prevTrackBtn');
        const nextTrackBtn = document.getElementById('nextTrackBtn');
        const modeToggleBtn = document.getElementById('modeToggleBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const muteBtn = document.getElementById('muteBtn');
        const nowPlayingText = document.querySelector('.now-playing-text');

        // Resources
        const STREAM_URL = "https://stream.nightride.fm/nightride.mp3";
        const LOCAL_PLAYLIST = [
            { title: "FIGHT BACK", src: "Music/Fight Back.mp3" },
            { title: "UFO", src: "Music/UFO.mp3" }
        ];
        let localTrackIndex = 0;
        let isOnline = true;

        // DEBUG: Error Handling
        bgAudio.addEventListener('error', (e) => {
            console.error("Audio Error:", e);
            updateText("ERROR: CANNOT LOAD FILE");
        });

        // Icons
        const playIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        const pauseIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;

        const soundOnIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`;
        const soundOffIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
        const globeIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
        const fileIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg`;

        bgAudio.volume = 0.5;

        // Functions
        const updateText = (text) => {
            if (nowPlayingText) nowPlayingText.textContent = text;
        };

        const updatePlayerUI = () => {
            if (playPauseBtn) {
                playPauseBtn.innerHTML = bgAudio.paused ? playIcon : pauseIcon;
                if (bgAudio.paused) playPauseBtn.classList.add('is-paused');
                else playPauseBtn.classList.remove('is-paused');
            }
            if (muteBtn) muteBtn.innerHTML = bgAudio.muted ? soundOffIcon : soundOnIcon;
            if (modeToggleBtn) modeToggleBtn.innerHTML = isOnline ? globeIcon : fileIcon;
        };

        const loadTrack = (play = true) => {
            if (isOnline) {
                bgAudio.src = STREAM_URL;
                bgAudio.loop = false;
                updateText("(FM) NIGHT RIDE SYNTHWAVE");
            } else {
                const track = LOCAL_PLAYLIST[localTrackIndex];
                bgAudio.src = track.src;
                // bgAudio.loop = true; // CHANGED: Disable loop to allow auto-next
                bgAudio.loop = false;
                updateText(`(LOCAL) ${track.title}`);
            }
            if (play) {
                bgAudio.play().then(updatePlayerUI).catch(updatePlayerUI);
            }
        };

        // Event Listeners
        // Auto-Next Track Listener
        bgAudio.addEventListener('ended', () => {
            if (!isOnline) {
                handleTrackChange('next');
            }
        });

        if (modeToggleBtn) modeToggleBtn.addEventListener('click', () => {
            isOnline = !isOnline;
            loadTrack(true);
        });

        // Toggle Logic for Buttons
        const toggleAudio = () => {
            if (bgAudio.paused) bgAudio.play().catch(console.error);
            else bgAudio.pause();
            updatePlayerUI();
        };

        if (playPauseBtn) playPauseBtn.addEventListener('click', toggleAudio);

        bgAudio.addEventListener('play', updatePlayerUI);
        bgAudio.addEventListener('pause', updatePlayerUI);

        const handleTrackChange = (direction) => {
            if (isOnline) {
                bgAudio.currentTime = 0;
                bgAudio.play();
                updateText("(FM) RETUNING...");
                setTimeout(() => updateText("(FM) NIGHT RIDE SYNTHWAVE"), 1000);
            } else {
                if (direction === 'next') localTrackIndex = (localTrackIndex + 1) % LOCAL_PLAYLIST.length;
                else localTrackIndex = (localTrackIndex - 1 + LOCAL_PLAYLIST.length) % LOCAL_PLAYLIST.length;
                loadTrack(true);
            }
        };

        if (prevTrackBtn) prevTrackBtn.addEventListener('click', () => handleTrackChange('prev'));
        if (nextTrackBtn) nextTrackBtn.addEventListener('click', () => handleTrackChange('next'));

        if (volumeSlider) volumeSlider.addEventListener('input', (e) => {
            bgAudio.volume = parseFloat(e.target.value);
            if (bgAudio.muted && bgAudio.volume > 0) bgAudio.muted = false;
            updatePlayerUI();
        });

        if (muteBtn) muteBtn.addEventListener('click', () => {
            bgAudio.muted = !bgAudio.muted;
            updatePlayerUI();
        });

        // Initialize
        updateText("(FM) NIGHT RIDE SYNTHWAVE");
        updatePlayerUI();
        bgAudio.play().catch(() => { });
        document.addEventListener('click', () => {
            if (bgAudio.paused) bgAudio.play().catch(() => { });
        }, { once: true });
    }

    // --- GAME ENGINE ---
    let gameLoopId;
    let canvas, ctx;
    let player, bullets, enemies;
    let score = 0;
    let level = 1;
    let gameState = 'MENU'; // MENU, PLAYING, PAUSED, GAMEOVER
    let keys = {};
    let enemySpawnTimer = 0;

    function initGameLogic() {
        // Initialize Game State IMMEDIATELY to prevent draw() crashes
        player = { x: 20, y: 150, w: 30, h: 30, color: '#00ff00', speed: 5 };
        bullets = [];
        enemies = [];
        keys = {};

        canvas = document.getElementById('gameCanvas');
        if (!canvas) return; // Not on page
        ctx = canvas.getContext('2d');

        // Buttons
        const startBtn = document.getElementById('startGameBtn');
        const resumeBtn = document.getElementById('resumeGameBtn');
        const quitBtn = document.getElementById('quitGameBtn');
        const restartBtn = document.getElementById('restartGameBtn');
        const manualPauseBtn = document.getElementById('manualPauseBtn');
        const manualStopBtn = document.getElementById('manualStopBtn');

        if (startBtn) startBtn.addEventListener('click', startGame);
        if (resumeBtn) resumeBtn.addEventListener('click', resumeGame);
        if (quitBtn) quitBtn.addEventListener('click', stopGame);
        if (restartBtn) restartBtn.addEventListener('click', startGame);

        if (manualPauseBtn) manualPauseBtn.addEventListener('click', () => {
            if (gameState === 'PLAYING') pauseGame();
            else if (gameState === 'PAUSED') resumeGame();
        });

        if (manualStopBtn) manualStopBtn.addEventListener('click', stopGame);

        // --- NEW CONTROLS LOGIC ---
        const btnUp = document.getElementById('btnUp');
        const btnDown = document.getElementById('btnDown');
        const btnFire = document.getElementById('btnFire');

        // Helper for touch/mouse handling
        const bindBtn = (btn, key) => {
            if (!btn) return;
            const down = (e) => {
                e.preventDefault();
                keys[key] = true;
                // Haptic Feedback for Touch
                if (e.type === 'touchstart' && navigator.vibrate) {
                    try { navigator.vibrate(40); } catch (err) { /* Ignore if not supported/allowed */ }
                }
            };
            const up = (e) => { e.preventDefault(); keys[key] = false; };

            btn.addEventListener('mousedown', down);
            btn.addEventListener('mouseup', up);
            btn.addEventListener('touchstart', down, { passive: false });
            btn.addEventListener('touchend', up);
            btn.addEventListener('mouseleave', up); // Safety
        };

        bindBtn(btnUp, 'ArrowUp');
        bindBtn(btnDown, 'ArrowDown');
        bindBtn(btnFire, 'Space');

        // Touch Input on Canvas (Optional alternate control)
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touchY = e.touches[0].clientY;
            const rect = canvas.getBoundingClientRect();
            const relY = touchY - rect.top;

            if (relY < rect.height / 2) keys['ArrowUp'] = true;
            else keys['ArrowDown'] = true;
            keys['Space'] = true; // Auto shoot on touch
        }, { passive: false });

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            keys['ArrowUp'] = false;
            keys['ArrowDown'] = false;
            keys['Space'] = false;
        });

        // Initial Render
        draw();
    }

    // Global Input Listeners (One time init)
    window.addEventListener('keydown', (e) => {
        keys[e.code] = true;

        // Game Start/Retry on Enter
        if (e.code === 'Enter') {
            const currentPage = pages[currentPageIndex];
            if (currentPage && currentPage.id === 'vibe') {
                if (gameState === 'MENU' || gameState === 'GAMEOVER') {
                    // Prevent default usually not needed unless it triggers form submit
                    e.preventDefault();
                    startGame();
                }
            }
        }

        // Page Navigation (Left/Right Arrows)
        if (e.code === 'ArrowLeft') {
            const currentPage = pages[currentPageIndex];
            // If Game is active, BLOCK navigation (prevent accidental exit)
            if (currentPage && currentPage.id === 'vibe' && gameState === 'PLAYING') return;
            handleNavigation('prev');
        }

        if (e.code === 'ArrowRight') {
            const currentPage = pages[currentPageIndex];
            // If Game is active, BLOCK navigation (Game uses ArrowRight for action)
            if (currentPage && currentPage.id === 'vibe' && gameState === 'PLAYING') return;
            handleNavigation('next');
        }
    });
    window.addEventListener('keyup', (e) => keys[e.code] = false);

    function startGame() {
        score = 0;
        level = 1;
        // Player Start: Left Center. Width/Height swapped for Horizontal visual profile if needed, 
        // but let's keep it squareish or rotate. 
        // Horizontal Mode: x is fixed-ish, y changes.
        player = { x: 20, y: 150, w: 30, h: 30, color: '#00ff00', speed: 5 };
        bullets = [];
        enemies = [];
        gameState = 'PLAYING';
        enemySpawnTimer = 0;

        document.getElementById('startScreen').classList.remove('active');
        document.getElementById('gameOverScreen').classList.remove('active');
        document.getElementById('pauseScreen').classList.remove('active');

        updateScoreUI();
        gameLoop();
    }

    function pauseGame() {
        if (gameState !== 'PLAYING') return;
        gameState = 'PAUSED';
        cancelAnimationFrame(gameLoopId);
        document.getElementById('pauseScreen').classList.add('active');
    }

    function resumeGame() {
        if (gameState !== 'PAUSED') return;
        gameState = 'PLAYING';
        document.getElementById('pauseScreen').classList.remove('active');
        gameLoop();
    }

    function stopGame() {
        gameState = 'MENU';
        cancelAnimationFrame(gameLoopId);
        document.getElementById('pauseScreen').classList.remove('active');
        document.getElementById('gameOverScreen').classList.remove('active');
        document.getElementById('startScreen').classList.add('active');
        // Clear board
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Explicit global cleaner
    function cleanupGame() {
        gameState = 'MENU';
        cancelAnimationFrame(gameLoopId);
        // Remove listeners if you want to be super clean, but weak refs are ok here for now
    }

    function gameOver() {
        gameState = 'GAMEOVER';
        document.getElementById('finalScore').textContent = score;
        document.getElementById('gameOverScreen').classList.add('active');
    }

    function gameLoop() {
        if (gameState !== 'PLAYING') return;
        update();
        draw();
        gameLoopId = requestAnimationFrame(gameLoop);
    }

    function update() {
        // Player Move (Y-Axis)
        if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
        if (keys['ArrowDown'] && player.y < canvas.height - player.h) player.y += player.speed;

        // Shoot
        if (keys['Space'] || keys['ArrowRight']) { // Right arrow can also shoot
            // Cooldown logic similar to before
            if (bullets.length === 0 || bullets[bullets.length - 1].x > player.x + 50) {
                // Bullet moves Right
                bullets.push({ x: player.x + 30, y: player.y + 13, w: 10, h: 4, speed: 7 });
            }
        }

        // Bullets Move (Right)
        bullets.forEach((b, i) => {
            b.x += b.speed;
            if (b.x > canvas.width) bullets.splice(i, 1);
        });

        // Spawn Enemies (From Right)
        enemySpawnTimer++;
        if (enemySpawnTimer > (60 - level * 2)) {
            const size = 30;
            const y = Math.random() * (canvas.height - size);
            // Spawn at Right Edge
            enemies.push({ x: canvas.width, y: y, w: size, h: size, speed: 2 + level * 0.5 });
            enemySpawnTimer = 0;
        }

        // Enemies Move (Left)
        enemies.forEach((e, i) => {
            e.x -= e.speed;

            // Collision Player
            if (rectIntersect(player, e)) {
                gameOver();
            }

            // Remove off screen (Left)
            if (e.x + e.w < 0) {
                enemies.splice(i, 1);
            }
        });

        // Collision Bullet-Enemy
        bullets.forEach((b, bi) => {
            enemies.forEach((e, ei) => {
                if (rectIntersect(b, e)) {
                    score += 10;
                    if (score > 0 && score % 100 === 0) level++;
                    updateScoreUI();
                    enemies.splice(ei, 1);
                    bullets.splice(bi, 1);
                }
            });
        });
    }

    function draw() {
        // BG
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Stars (Horizontal Flow)
        ctx.fillStyle = '#fff';
        // Draw some static stars, or animate them moving left for speed effect?
        // Static for now to save perf/complexity
        if (Math.random() > 0.9) ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);

        // Player (Rocket Points Right)
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        // Triangle pointing Right
        ctx.moveTo(player.x + player.w, player.y + player.h / 2); // Tip (Right)
        ctx.lineTo(player.x, player.y); // Top Left
        ctx.lineTo(player.x, player.y + player.h); // Bottom Left
        ctx.fill();

        // Engine Flame (Optional)
        ctx.fillStyle = 'orange';
        ctx.fillRect(player.x - 5, player.y + 10, 5, 10);

        // Bullets
        ctx.fillStyle = '#fff';
        bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

        // Enemies
        ctx.fillStyle = 'red';
        enemies.forEach(e => {
            ctx.fillRect(e.x, e.y, e.w, e.h);
            // Eyes (Looking Left)
            ctx.fillStyle = '#000';
            ctx.fillRect(e.x + 5, e.y + 10, 5, 5);
            ctx.fillRect(e.x + 5, e.y + 20, 5, 5); // Stacked eyes or side by side? Side by side for simplicity
            ctx.fillStyle = 'red';
        });
    }

    function updateScoreUI() {
        const s = document.getElementById('scoreVal');
        const l = document.getElementById('levelVal');
        if (s) s.textContent = score;
        if (l) l.textContent = level;
    }

    function rectIntersect(r1, r2) {
        return !(r2.x > r1.x + r1.w ||
            r2.x + r2.w < r1.x ||
            r2.y > r1.y + r1.h ||
            r2.y + r2.h < r1.y);
    }


    // --- GOOGLE DRIVE MODAL LOGIC (GENIE EFFECT) ---
    // Defined globally so onclick can find it
    window.openDriveModal = function (originElement) {
        // If already minimized, just restore it
        if (driveModal.classList.contains('minimized')) {
            restoreDriveModal();
            return;
        }

        if (!driveModal || !driveModalContainer || !driveFrame) return;

        // 1. Calculate Origin for Genie Effect
        const rect = originElement.getBoundingClientRect();
        const containerRect = deviceFrame.getBoundingClientRect();

        // Center of button
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;

        // Center of container
        const contX = containerRect.left;
        const contY = containerRect.top;

        // Relative position inside the container
        const originX = btnX - contX;
        const originY = btnY - contY;

        // Apply Transform Origin dynamically
        driveModalContainer.style.transformOrigin = `${originX}px ${originY}px`;

        // 2. Load Content
        driveFrame.src = `https://drive.google.com/embeddedfolderview?id=${GDRIVE_ID}#grid`;

        // 3. Activate Blur on Background Elements
        deviceFrame.classList.add('blur-mode');

        // 4. Show Modal
        driveModal.style.display = 'flex';
        // Force reflow/frame to ensure transition plays
        requestAnimationFrame(() => {
            driveModal.classList.remove('minimized');
            driveModal.classList.remove('genie-anim'); // Safety clear
            driveModal.classList.add('active');
        });
    }







    // --- MINIMIZE LOGIC ---
    const minimizeDriveBtn = document.getElementById('minimizeDriveBtn');
    const taskbarContainer = document.getElementById('taskbarContainer');

    window.minimizeDriveModal = function () {
        if (!driveModal) return;

        // 1. Hide Modal (Visual only, keep state)
        // driveModal.classList.remove('active'); // Don't remove active immediately
        driveModal.classList.add('genie-anim'); // TRIGGER ANIMATION
        driveModal.classList.add('minimized'); // Mark state

        setTimeout(() => {
            if (driveModal.classList.contains('minimized')) {
                driveModal.style.display = 'none';
            }
            driveModal.classList.remove('active');
            driveModal.classList.remove('genie-anim');
        }, 400);

        // 2. Remove Blur
        if (deviceFrame) deviceFrame.classList.remove('blur-mode');

        // 3. Add to Taskbar
        if (taskbarContainer) {
            const taskItem = document.createElement('div');
            taskItem.className = 'taskbar-item';
            taskItem.id = 'taskbarItem_Drive';
            taskItem.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <span class="task-close-btn" onclick="event.stopPropagation(); closeDriveModal();">X</span>
            `;
            taskItem.onclick = restoreDriveModal;
            taskbarContainer.appendChild(taskItem);
        }
    }

    window.restoreDriveModal = function () {
        if (!driveModal) return;

        // 1. Show Modal
        driveModal.style.display = 'flex';
        // Need a small delay to allow display flex to apply before adding class for transition
        requestAnimationFrame(() => {
            driveModal.classList.remove('minimized');
            driveModal.classList.add('active');
        });

        // 2. Restore Blur
        if (deviceFrame) deviceFrame.classList.add('blur-mode');

        // 3. Remove From Taskbar
        const taskItem = document.getElementById('taskbarItem_Drive');
        if (taskItem) taskItem.remove();
    }

    if (minimizeDriveBtn) {
        minimizeDriveBtn.addEventListener('click', minimizeDriveModal);
    }

    window.closeDriveModal = function () {
        const driveModal = document.getElementById('driveModal');
        const driveFrame = document.getElementById('driveFrame');
        if (!driveModal) return;

        // Animation Logic: If active, animate out
        if (driveModal.classList.contains('active')) {
            driveModal.classList.add('genie-anim');
            setTimeout(finalizeDriveClose, 350);
        } else {
            finalizeDriveClose();
        }

        function finalizeDriveClose() {
            // FIX: Hide FIRST to prevent ghost transition
            driveModal.style.display = 'none';
            if (driveFrame) driveFrame.src = '';

            driveModal.classList.remove('active');
            driveModal.classList.remove('genie-anim');

            if (deviceFrame) deviceFrame.classList.remove('blur-mode');

            // Taskbar Cleanup
            const taskItem = document.getElementById('taskbarItem_Drive');
            const taskbarGroup = document.getElementById('taskbarGroup');

            // FIX: ONLY remove if NOT animating from Close All (Check Group Animation)
            const isGroupAnimating = taskbarGroup && taskbarGroup.classList.contains('left-dissolve-anim');

            if (taskItem && !isGroupAnimating) {
                taskItem.remove();
            }

            driveModal.classList.remove('minimized');
        }
    }

    // --- FIX: Works Page Close Button Listener was missing! ---
    // reused global 'closeDriveBtn' from top of file
    if (closeDriveBtn) {
        closeDriveBtn.addEventListener('click', closeDriveModal);
    }

    // --- CONTACT MODAL LOGIC (GENIE EFFECT) ---
    // Using user-provided URL + embedded=true for cleanest look
    const GFORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScJP0BjXUCNp9HsIc3fLi2PatZJBzY1DqCzhbdFcgf5znY4tw/viewform?embedded=true&usp=dialog";

    window.openContactModal = function (originElement) {
        const contactModal = document.getElementById('contactModal');
        // Warning: This selector looks for .drive-modal-container inside #contactModal
        // Ensure index.html structure matches this
        const contactModalContainer = contactModal ? contactModal.querySelector('.drive-modal-container') : null;
        const contactFrame = document.getElementById('contactFrame');

        if (!contactModal || !contactModalContainer || !contactFrame) {
            console.error("Contact Modal elements not found!");
            return;
        }

        // 1. Calculate Origin for Genie Effect
        const rect = originElement.getBoundingClientRect();
        const containerRect = deviceFrame.getBoundingClientRect();

        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        const contX = containerRect.left;
        const contY = containerRect.top;
        const originX = btnX - contX;
        const originY = btnY - contY;

        contactModalContainer.style.transformOrigin = `${originX}px ${originY}px`;

        // 2. Load Contact Form
        contactFrame.src = GFORM_URL;

        // 3. Activate Blur
        deviceFrame.classList.add('blur-mode');

        // 4. Show Modal
        contactModal.style.display = 'flex';
        requestAnimationFrame(() => {
            contactModal.classList.remove('minimized');
            contactModal.classList.remove('genie-anim');
            contactModal.classList.add('active');
        });
    }

    window.closeContactModal = function () {
        const contactModal = document.getElementById('contactModal');
        const contactFrame = document.getElementById('contactFrame');
        if (!contactModal) return;

        // Animation Check
        if (contactModal.classList.contains('active')) {
            contactModal.classList.add('genie-anim');
            setTimeout(finalizeContactClose, 350);
        } else {
            finalizeContactClose();
        }

        function finalizeContactClose() {
            // FIX: Hide FIRST to prevent ghost transition
            contactModal.style.display = 'none';
            if (contactFrame) contactFrame.src = '';

            contactModal.classList.remove('active');
            contactModal.classList.remove('genie-anim');

            if (deviceFrame) deviceFrame.classList.remove('blur-mode');

            // Clean up taskbar
            const taskItem = document.getElementById('taskbarItem_Contact');
            const taskbarGroup = document.getElementById('taskbarGroup');

            // FIX: ONLY remove if NOT animating from Close All (Check Group Animation)
            const isGroupAnimating = taskbarGroup && taskbarGroup.classList.contains('left-dissolve-anim');

            if (taskItem && !isGroupAnimating) {
                taskItem.remove();
            }

            contactModal.classList.remove('minimized');
        }
    }

    // Attach Close Listener for Contact Modal
    const closeContactBtn = document.getElementById('closeContactBtn');
    if (closeContactBtn) {
        closeContactBtn.addEventListener('click', closeContactModal);
    }

    // --- CONTACT MINIMIZE LOGIC ---
    const minimizeContactBtn = document.getElementById('minimizeContactBtn');

    window.minimizeContactModal = function () {
        const contactModal = document.getElementById('contactModal');
        if (!contactModal) return;

        // 1. Hide Modal
        // contactModal.classList.remove('active');
        contactModal.classList.add('genie-anim'); // TRIGGER GENIE ANIMATION
        contactModal.classList.add('minimized');

        setTimeout(() => {
            if (contactModal.classList.contains('minimized')) {
                contactModal.style.display = 'none';
            }
            contactModal.classList.remove('active');
            contactModal.classList.remove('genie-anim');
        }, 400);

        // 2. Remove Blur
        if (deviceFrame) deviceFrame.classList.remove('blur-mode');

        // 3. Add to Taskbar
        if (taskbarContainer) {
            const taskItem = document.createElement('div');
            taskItem.className = 'taskbar-item';
            taskItem.id = 'taskbarItem_Contact';
            taskItem.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span class="task-close-btn" onclick="event.stopPropagation(); closeContactModal();">X</span>
            `;
            taskItem.onclick = restoreContactModal;
            taskbarContainer.appendChild(taskItem);
        }
    }

    window.restoreContactModal = function () {
        const contactModal = document.getElementById('contactModal');
        if (!contactModal) return;

        // 1. Show Modal
        contactModal.style.display = 'flex';
        requestAnimationFrame(() => {
            contactModal.classList.remove('minimized');
            contactModal.classList.add('active');
        });

        // 2. Restore Blur
        if (deviceFrame) deviceFrame.classList.add('blur-mode');

        // 3. Remove From Taskbar
        const taskItem = document.getElementById('taskbarItem_Contact');
        if (taskItem) taskItem.remove();
    }

    if (minimizeContactBtn) {
        minimizeContactBtn.addEventListener('click', minimizeContactModal);
    }

    // --- CUSTOM BLOG MODAL LOGIC ---
    // New logic uses BLOG_DATA instead of iframe
    window.openBlogModal = function (postId, originElement) {
        const blogModal = document.getElementById('blogModal');
        const blogModalContainer = document.getElementById('blogModalContainer');
        const blogContentArea = document.getElementById('blogContentArea');

        if (!blogModal || !blogModalContainer || !blogContentArea) return;

        // Store active ID
        blogModal.dataset.activePostId = postId;

        // Check if this specific article is minmized and remove it (Opening restores it)
        const specificTaskItem = document.getElementById(`taskbarItem_Blog_${postId}`);
        if (specificTaskItem) {
            specificTaskItem.remove();
        }

        // 1. Sort posts by Date (Safely)
        // FIX: Handle "STAY TUNED" or invalid dates by treating them as new
        const sortedPosts = [...BLOG_DATA].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (isNaN(dateA)) return -1; // Newest (top)
            if (isNaN(dateB)) return 1;
            return dateB - dateA;
        });

        // 2. Find Current Post Index
        const currentIndex = sortedPosts.findIndex(p => p.id == postId);
        if (currentIndex === -1) {
            console.error("Post not found:", postId);
            return;
        }

        const post = sortedPosts[currentIndex];
        const nextPost = (currentIndex < sortedPosts.length - 1) ? sortedPosts[currentIndex + 1] : null;
        const prevPost = (currentIndex > 0) ? sortedPosts[currentIndex - 1] : null;

        // Helper: Render Content
        const renderContent = () => {
            let heroSrc = post.media;
            const heroMediaHTML = `
                <div class="blog-detail-hero" style="background-image: url('${heroSrc}');">
                    <div class="blog-hero-overlay">
                        <span class="blog-category-tag">${post.category || 'GENERAL'}</span>
                        <div class="blog-detail-title">${post.title}</div>
                        <div class="blog-detail-subtitle">${post.preview}</div>
                        <div class="blog-detail-date">${post.date}</div>
                    </div>
                </div>`;

            blogContentArea.innerHTML = `
                ${heroMediaHTML}
                <div class="blog-detail-content">
                    ${post.content}
                </div>
                <div class="blog-nav-footer">
                    ${prevPost ?
                    `<button class="nav-article-btn" onclick="openBlogModal(${prevPost.id})" title="Previous">
                           &lt;
                        </button>`
                    : `<button class="nav-article-btn disabled">&lt;</button>`}
                    
                    ${nextPost ?
                    `<button class="nav-article-btn" onclick="openBlogModal(${nextPost.id})" title="Next">
                           &gt;
                        </button>`
                    : `<button class="nav-article-btn disabled">&gt;</button>`}
                </div>
            `;
            // Mark as loaded
            blogModal.dataset.loadedPostId = String(postId);
        };

        // 3. Logic: Transition vs Initial Load
        if (blogModal.classList.contains('active')) {
            // Already Open -> Enable SMOOTH TRANSITION
            if (blogModal.dataset.loadedPostId !== String(postId)) {
                // Fade Out
                blogContentArea.classList.add('content-fade-out');

                // Wait for fade out, then swap
                setTimeout(() => {
                    renderContent();
                    blogContentArea.scrollTop = 0; // Reset scroll
                    blogContentArea.classList.remove('content-fade-out'); // Fade In
                }, 300);
            }
        } else {
            // Initial Open -> Render Immediately
            if (blogModal.dataset.loadedPostId !== String(postId)) {
                renderContent();
            }

            // Execute Genie Effect Logic
            if (originElement) {
                const rect = originElement.getBoundingClientRect();
                const containerRect = deviceFrame.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;
                const contX = containerRect.left;
                const contY = containerRect.top;
                const originX = btnX - contX;
                const originY = btnY - contY;
                blogModalContainer.style.transformOrigin = `${originX}px ${originY}px`;
            }

            // Activate Blur & Show
            deviceFrame.classList.add('blur-mode');
            blogModal.style.display = 'flex';
            blogModal.classList.remove('genie-anim');
            void blogModalContainer.offsetWidth; // Force Reflow

            requestAnimationFrame(() => {
                blogModal.classList.remove('minimized');
                blogModal.classList.add('active');
            });
        }
    }

    window.closeBlogModal = function () {
        const blogModal = document.getElementById('blogModal');
        if (!blogModal) return;

        if (blogModal.classList.contains('active')) {
            // Reset origin to prevent jump/jerk during close
            const blogModalContainer = document.getElementById('blogModalContainer');
            if (blogModalContainer) blogModalContainer.style.transformOrigin = 'center center';

            blogModal.classList.add('genie-anim');
            setTimeout(finalizeBlogClose, 350);
        } else {
            finalizeBlogClose();
        }

        function finalizeBlogClose() {
            // FIX: Hide FIRST to prevent ghost transition
            blogModal.style.display = 'none';
            // Clear content to stop video playing
            const blogContentArea = document.getElementById('blogContentArea');
            if (blogContentArea) blogContentArea.innerHTML = '';

            // FIX: Reset loaded ID so it re-renders next time
            delete blogModal.dataset.loadedPostId;

            blogModal.classList.remove('active');
            blogModal.classList.remove('genie-anim');
            deviceFrame.classList.remove('blur-mode');

            // Taskbar Cleanup
            // Fix: Find correct ID based on stored dataset (since minimize creates unique IDs)
            let taskItem = document.getElementById('taskbarItem_Blog'); // Fallback legacy

            if (blogModal.dataset.activePostId) {
                const specificId = `taskbarItem_Blog_${blogModal.dataset.activePostId}`;
                const specificItem = document.getElementById(specificId);
                if (specificItem) taskItem = specificItem;
            }

            // FIX: ONLY remove if NOT animating (Check Group Animation)
            const taskbarGroup = document.getElementById('taskbarGroup');
            const isGroupAnimating = taskbarGroup && taskbarGroup.classList.contains('left-dissolve-anim');

            if (taskItem && !isGroupAnimating) {
                taskItem.remove();
            }

            // Remove minimized class
            blogModal.classList.remove('minimized');
        }
    }

    // Attach Close Listener for Blog Modal
    const closeBlogBtn = document.getElementById('closeBlogBtn');
    if (closeBlogBtn) {
        closeBlogBtn.addEventListener('click', closeBlogModal);
    }

    // --- BLOG MINIMIZE LOGIC ---
    const minimizeBlogBtn = document.getElementById('minimizeBlogBtn');

    window.minimizeBlogModal = function () {
        const blogModal = document.getElementById('blogModal');
        if (!blogModal) return;

        // 1. Minimize with GENIE Animation
        // Reset origin to prevent jump/jerk
        const blogModalContainer = document.getElementById('blogModalContainer');
        if (blogModalContainer) blogModalContainer.style.transformOrigin = 'center center';

        blogModal.classList.add('genie-anim'); // TRIGGER ANIMATION
        blogModal.classList.add('minimized');

        setTimeout(() => {
            if (blogModal.classList.contains('minimized')) {
                blogModal.style.display = 'none';
            }
            blogModal.classList.remove('active');
            blogModal.classList.remove('genie-anim');
        }, 400);

        // 2. Remove Blur
        if (deviceFrame) deviceFrame.classList.remove('blur-mode');

        // 3. Add Taskbar Item
        if (taskbarContainer) {
            const activePostId = blogModal.dataset.activePostId || 'generic';
            const taskId = `taskbarItem_Blog_${activePostId}`;

            // Robust Fix: If duplicate exists, remove it first to ensure clean state
            const existingItem = document.getElementById(taskId);
            if (existingItem) {
                existingItem.remove();
            }

            const taskItem = document.createElement('div');
            taskItem.className = 'taskbar-item';
            taskItem.id = taskId;
            // Standard generic Blog Icon for all posts
            taskItem.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span class="task-close-btn" onclick="event.stopPropagation(); closeBlogModal();">X</span>
            `;
            // Restore specific post on click
            taskItem.onclick = function () {
                openBlogModal(activePostId, taskItem);
            };
            taskbarContainer.appendChild(taskItem);
        }
    }

    // window.restoreBlogModal Removed (Duplicate/Dead Code)

    if (minimizeBlogBtn) {
        minimizeBlogBtn.addEventListener('click', minimizeBlogModal);
    }


    // --- SCROLL TO TOP LOGIC ---
    const blogScrollTopBtn = document.getElementById('blogScrollTopBtn');
    const blogContentArea = document.getElementById('blogContentArea');
    const blogModalOverlay = document.getElementById('blogModal'); // The overlay acts as scroller on mobile

    if (blogScrollTopBtn && blogContentArea && blogModalOverlay) {
        // 1. Click to Scroll (Target BOTH to be safe)
        blogScrollTopBtn.addEventListener('click', () => {
            blogContentArea.scrollTo({ top: 0, behavior: 'smooth' });
            blogModalOverlay.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // 2. Toggle Visibility on Scroll
        // function to check scroll position of EITHER
        const checkScroll = () => {
            // Check scroll of overlay (mobile) OR content (desktop)
            const scrollTop = blogContentArea.scrollTop + blogModalOverlay.scrollTop;
            if (scrollTop > 50) {
                blogScrollTopBtn.classList.add('visible');
            } else {
                blogScrollTopBtn.classList.remove('visible');
            }
        };

        blogContentArea.addEventListener('scroll', checkScroll);
        blogModalOverlay.addEventListener('scroll', checkScroll);
    }

    // --- CLOSE ALL LOGIC ---
    const closeAllBtn = document.getElementById('closeAllTaskbarBtn');

    window.updateCloseAllButton = function () {
        if (!closeAllBtn) return;
        const taskbarItems = document.querySelectorAll('.taskbar-item');
        if (taskbarItems.length > 0) {
            closeAllBtn.classList.add('visible');
        } else {
            closeAllBtn.classList.remove('visible');
        }
    }

    // Call this whenever we minimize/restore
    // We can hook into the existing functions or use a MutationObserver on the taskbar container?
    // Let's create an observer for robustness
    if (taskbarContainer && closeAllBtn) {
        const observer = new MutationObserver(updateCloseAllButton);
        observer.observe(taskbarContainer, { childList: true });
    }

    if (closeAllBtn) {
        closeAllBtn.addEventListener('click', () => {
            // 1. Animate Entire Group (Taskbar + Button) together
            const taskbarGroup = document.getElementById('taskbarGroup');
            if (taskbarGroup) {
                // Remove first to reset
                taskbarGroup.classList.remove('slide-left-fade-out');
                // Trigger Reflow
                void taskbarGroup.offsetWidth;
                // Add Animation Class
                taskbarGroup.classList.add('slide-left-fade-out');
            }

            // 2. WAIT for animation, THEN Close Modals & Cleanup
            setTimeout(() => {
                // Close Modals (This removes taskbar items logic internal to them, but we clarify removal below too)
                if (window.closeDriveModal) window.closeDriveModal();
                if (window.closeContactModal) window.closeContactModal();
                if (window.closeBlogModal) window.closeBlogModal();

                // Extra safety: Remove any remaining items
                const allItems = document.querySelectorAll('.taskbar-item');
                allItems.forEach(item => item.remove());

                // FIX: Force button state to hidden INSTANTLY to prevent flash
                if (closeAllBtn) {
                    // Disable transition temporarily so it doesn't "fade out" while jumping back
                    closeAllBtn.style.transition = 'none';
                    closeAllBtn.classList.remove('visible');
                    closeAllBtn.style.opacity = '0';
                    closeAllBtn.style.visibility = 'hidden';
                }

                // Reset the Group Animation (opacity goes back to 1)
                if (taskbarGroup) {
                    taskbarGroup.classList.remove('slide-left-fade-out');
                }

                updateCloseAllButton();

                // Clean up inline styles after a brief moment so future transitions work
                setTimeout(() => {
                    if (closeAllBtn) {
                        closeAllBtn.style.transition = '';
                        closeAllBtn.style.opacity = '';
                        closeAllBtn.style.visibility = '';
                    }
                }, 50);

            }, 600); // 600ms matches CSS animation time (Smoother)
        });
    }

    // Close on click outside (Optional, but user said "Close button needed")
    // If they want click outside to close:
    /*
    driveModal.addEventListener('click', (e) => {
        if (e.target === driveModal) closeDriveModal();
    });
    */

    // --- BODY SCROLL LOCK HELPER ---
    const lockBodyScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const unlockBodyScroll = () => {
        document.body.style.overflow = '';
    };

    // --- POPUP AD LOGIC ---
    const popupAd = document.getElementById('popupAd');
    const closePopupBtn = document.getElementById('closePopupBtn');

    if (popupAd && closePopupBtn) {
        // Show after delay (Wait for boot sequence to finish ~3s)
        /* 

       setTimeout(() => {
           popupAd.classList.remove('hidden-popup');
           // Force reflow
           void popupAd.offsetWidth;
           popupAd.classList.add('show-popup');
           lockBodyScroll();
       }, 3500);
        */
        closePopupBtn.addEventListener('click', () => {
            popupAd.classList.remove('show-popup');
            // Wait for transition then hide
            setTimeout(() => {
                popupAd.classList.add('hidden-popup');
                popupAd.style.display = 'none'; // Ensure clicks pass through
                unlockBodyScroll();
            }, 500);
        });
    }



});
