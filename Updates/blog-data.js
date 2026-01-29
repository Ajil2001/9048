/**
 * ==========================================
 *        MY BLOG DATA (FRESH DESIGN)
 * ==========================================
 */

const BLOG_DATA = [
    // --- COMING SOON PLACEHOLDER ---
    {
        id: 0,
        type: "image",
        title: "COMING SOON!",
        category: "UPDATE",
        date: "STAY TUNED",
        media: "Images/blog/herocoming.jpg",
        preview: "We are crafting something amazing. Check back later!",
        content: `
            <div class="blog-intro-text" style="text-align: center; padding: 50px 0;">
                <h2 style="color: var(--primary-green);">COMING SOON</h2>
                <p>We are working on some exciting new articles.<br>Please check back soon!</p>
            </div>
        `
    },

    // --- ARCHIVED POSTS (HIDDEN) ---
    /*
    {
        id: 1,
        type: "image",
        title: "HERO IMAGE IN FULL",
        category: "CATEGORY",
        date: "DATE",
        media: "Images/blog/hero.png",
        preview: "Hero Heading, Category, Subheading, Date.",
        content: `
            <!-- INTRO TEXT -->
            <div class="blog-intro-text">
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.<br>
                Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
            </div>

            <!-- SPLIT SECTION: IMAGE LEFT / TEXT RIGHT -->
            <div class="blog-row">
                <div class="blog-col">
                    <div class="img-wrapper">
                         <img src="Images/blog/02.png" class="blog-content-img" alt="Fig 1.1">
                    </div>
                    <span class="blog-caption">FIG 1.1</span>
                </div>
                <div class="blog-col">
                    <h3>FORMATTING SHOWCASE</h3>
                    <p>This paragraph demonstrates various text styles:</p>
                    
                    <ul>
                        <li>This is a sentence with a <b>Next Line</b>.<br>See, it continues below.</li>
                        <li><b>Bold text</b> for emphasis.</li>
                        <li><i>Italic text</i> for style.</li>
                        <li><u>Underlined text</u> for attention.</li>
                        <li><mark>Highlighted text</mark> pop out.</li>
                        <li>Scientific formulas: H<sub>2</sub>O (Subscript) and E=mc<sup>2</sup> (Superscript).</li>
                    </ul>

                    <p>You can mix them <b><i><u>inside text also show</u></i></b> easily.</p>
                </div>
            </div>

            <!-- SPLIT SECTION: TEXT LEFT / IMAGE RIGHT -->
            <div class="blog-row reverse">
                <div class="blog-col">
                    <div class="img-wrapper">
                        <img src="Images/blog/03.png" class="blog-content-img" alt="Fig 1.2">
                    </div>
                    <span class="blog-caption">FIG 1.2</span>
                </div>
                <div class="blog-col">
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
                </div>
            </div>

            <!-- 2x2 IMAGE GRID -->
            <div class="img-grid-4">
                <div class="img-item">
                    <div class="img-wrapper">
                        <img src="Images/blog/02.png" class="blog-content-img">
                    </div>
                    <span class="blog-caption">FIG 1.1</span>
                </div>
                <div class="img-item">
                    <div class="img-wrapper">
                        <img src="Images/blog/03.png" class="blog-content-img">
                    </div>
                    <span class="blog-caption">FIG 1.1</span>
                </div>
                 <div class="img-item">
                    <div class="img-wrapper">
                        <img src="Images/blog/03.png" class="blog-content-img">
                    </div>
                    <span class="blog-caption">FIG 1.1</span>
                </div>
                <div class="img-item">
                    <div class="img-wrapper">
                        <img src="Images/blog/02.png" class="blog-content-img">
                    </div>
                    <span class="blog-caption">FIG 1.1</span>
                </div>
            </div>

            <!-- CONCLUSION SECTION -->
            <div class="blog-conclusion">
                <h3>CONCLUSION</h3>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam.</p>
            </div>
        `
    },
    {
        id: 2,
        type: "image",
        title: "THE ART OF TYPOGRAPHY",
        category: "DESIGN",
        date: "JAN 25, 2026",
        media: "Images/blog/hero.png",
        preview: "Fonts, Pairing, Readability, Hierarchy.",
        content: `
            <!-- INTRO TEXT -->
            <div class="blog-intro-text">
                <p>Typography is the voice of your design. It speaks before the user even reads the text. Choosing the right typeface can define the entire mood of your project.</p>
            </div>

            <!-- SPLIT SECTION: IMAGE LEFT / TEXT RIGHT -->
            <div class="blog-row">
                <div class="blog-col">
                    <div class="img-wrapper">
                         <img src="Images/blog/02.png" class="blog-content-img" alt="Fig 2.1">
                    </div>
                    <span class="blog-caption">FIG 2.1: SERIF VS SANS</span>
                </div>
                <div class="blog-col">
                    <h3>CHOOSING FONTS</h3>
                    <p>When selecting fonts, consider readability and personality:</p>
                    
                    <ul>
                        <li><b>Serif fonts</b> are traditional and reliable.</li>
                        <li><b>Sans-serif fonts</b> are modern and clean.</li>
                        <li><i>Display fonts</i> are best for large headings.</li>
                    </ul>
                </div>
            </div>

            <!-- CONCLUSION SECTION -->
            <div class="blog-conclusion">
                <h3>CONCLUSION</h3>
                <p>Mastering typography takes time, but it is the most robust skill a designer can have.</p>
            </div>
        `
    },
    {
        id: 3,
        type: "image",
        title: "COLOR PSYCHOLOGY 101",
        category: "THEORY",
        date: "JAN 20, 2026",
        media: "Images/blog/hero.png",
        preview: "Emotions, Palettes, Harmony, Contrast.",
        content: `
            <!-- INTRO TEXT -->
            <div class="blog-intro-text">
                <p>Colors evoke emotions and drive user actions. Understanding color theory is essential for creating effective and aesthetically pleasing designs.</p>
            </div>

            <div class="img-grid-4">
                <div class="img-item">
                    <div class="img-wrapper">
                        <img src="Images/blog/02.png" class="blog-content-img">
                    </div>
                    <span class="blog-caption">WARM TONES</span>
                </div>
                <div class="img-item">
                    <div class="img-wrapper">
                        <img src="Images/blog/03.png" class="blog-content-img">
                    </div>
                    <span class="blog-caption">COOL TONES</span>
                </div>
                 <div class="img-item">
                    <div class="img-wrapper">
                        <img src="Images/blog/03.png" class="blog-content-img">
                    </div>
                    <span class="blog-caption">PASTEL</span>
                </div>
                <div class="img-item">
                    <div class="img-wrapper">
                        <img src="Images/blog/02.png" class="blog-content-img">
                    </div>
                    <span class="blog-caption">NEON</span>
                </div>
            </div>

            <!-- CONCLUSION SECTION -->
            <div class="blog-conclusion">
                <h3>CONCLUSION</h3>
                <p>Use color wisely to guide the user's eye and create the right atmosphere.</p>
            </div>
        `
    },
    {
        id: 4,
        type: "image",
        title: "MODERN UI PATTERNS",
        category: "UI / UX",
        date: "JAN 15, 2026",
        media: "Images/blog/hero.png",
        preview: "Bento Grids, Glassmorphism, Dark Mode.",
        content: `
            <!-- INTRO TEXT -->
            <div class="blog-intro-text">
                <p>User Interface design is constantly evolving. From skeletal wireframes to high-fidelity prototypes, staying updated with trends is key.</p>
            </div>

            <!-- SPLIT SECTION: TEXT LEFT / IMAGE RIGHT -->
            <div class="blog-row reverse">
                <div class="blog-col">
                    <div class="img-wrapper">
                        <img src="Images/blog/03.png" class="blog-content-img" alt="Fig 4.1">
                    </div>
                    <span class="blog-caption">FIG 4.1: BENTO UI</span>
                </div>
                <div class="blog-col">
                    <p>Bento grids are excellent for organizing complex information in a digestible, modular way. They work perfectly responsive.</p>
                </div>
            </div>

            <!-- CONCLUSION SECTION -->
            <div class="blog-conclusion">
                <h3>CONCLUSION</h3>
                <p>Trends come and go, but good usability is forever.</p>
            </div>
        `
    },
    {
        id: 5,
        type: "image",
        title: "JAVASCRIPT PERFORMANCE",
        category: "DEV",
        date: "JAN 10, 2026",
        media: "Images/blog/hero.png",
        preview: "Optimization, Async, Memory, DOM.",
        content: `
            <!-- INTRO TEXT -->
            <div class="blog-intro-text">
                <p>Performance is a feature. Optimizing your JavaScript code ensures a smooth 60fps experience for your users, even on mobile devices.</p>
            </div>

            <!-- SPLIT SECTION: IMAGE LEFT / TEXT RIGHT -->
            <div class="blog-row">
                <div class="blog-col">
                    <div class="img-wrapper">
                         <img src="Images/blog/02.png" class="blog-content-img" alt="Fig 5.1">
                    </div>
                    <span class="blog-caption">FIG 5.1: V8 ENGINE</span>
                </div>
                <div class="blog-col">
                    <h3>KEY TIPS</h3>
                    <ul>
                        <li><b>Debounce</b> expensive events like scroll.</li>
                        <li>Use <i>requestAnimationFrame</i> for animations.</li>
                        <li>Avoid layout thrashing.</li>
                    </ul>
                </div>
            </div>

            <!-- CONCLUSION SECTION -->
            <div class="blog-conclusion">
                <h3>CONCLUSION</h3>
                <p>Clean code leads to fast apps. Always profile before you optimize.</p>
            </div>
        `
    }
    */
];
