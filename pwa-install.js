/**
 * PWA Installation & Service Worker Handler
 * Handles cross-platform installation logic for iOS, Android, and PC via a Custom Popup.
 */

// 1. Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// 2. Install Logic
let deferredPrompt;
const popupId = 'pwaInstallPopup';

// Show the Install Popup
function showInstallPopup(isIOS = false, deviceType = '') {
    // Prevent duplicates
    if (document.getElementById(popupId)) return;

    // Check if app is already installed (standalone)
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        return;
    }

    // Create Popup Modal
    const modal = document.createElement('div');
    modal.id = popupId;
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(5px);
        z-index: 10001;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    // Modal Content
    const content = document.createElement('div');
    content.style.cssText = `
        background: rgba(20, 20, 20, 0.95);
        border: 1px solid #00ff00;
        border-radius: 12px;
        padding: 25px;
        width: 90%;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
        font-family: 'Arimo', sans-serif;
        position: relative;
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    // Inner HTML Structure
    const defaultHTML = `
        <button id="pwaCloseBtn" style="position:absolute; top:10px; right:10px; background:transparent; border:none; color:#555; font-size:20px; cursor:pointer; line-height:1;">&times;</button>
        <h3 style="color:#00ff00; margin-top:0; letter-spacing:1px;">INSTALL APPLICATION</h3>
        <p style="color:#ccc; font-size:14px; line-height:1.5;">
            Install this application on your home screen for quick access and better performance.
        </p>
        <div style="margin-top:20px; display:flex; gap:10px; justify-content:center;">
            <button id="pwaCancel" style="background:transparent; color:#fff; border:1px solid #555; padding:8px 20px; border-radius:4px; cursor:pointer;">LATER</button>
            <button id="pwaConfirm" style="background:#00ff00; color:#000; border:none; padding:8px 20px; border-radius:4px; font-weight:bold; cursor:pointer;">INSTALL</button>
        </div>
    `;

    content.innerHTML = defaultHTML;
    modal.appendChild(content);
    document.body.appendChild(modal);

    // Fade In
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    });

    // Event Listeners
    modal.querySelector('#pwaCloseBtn').addEventListener('click', () => {
        closePopup();
    });

    modal.querySelector('#pwaCancel').addEventListener('click', () => {
        closePopup();
    });

    const confirmBtn = modal.querySelector('#pwaConfirm');
    confirmBtn.addEventListener('click', () => {
        if (isIOS || deviceType === 'Mac') {
            // Show Instructions for iOS/Mac
            showInstructions(content, deviceType);
        } else if (deferredPrompt) {
            // Android / Windows / Desktop Chrome
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
                closePopup();
            });
        }
    });

    function closePopup() {
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.9)';
        setTimeout(() => modal.remove(), 300);
    }

    function showInstructions(container, type) {
        let instructionHTML = '';
        if (type === 'Mac') {
            instructionHTML = `
        < p style = "color:#fff; font-size:14px; margin-bottom:15px;" >
            1. Click Share < svg width = "14" height = "14" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke - width="2" ><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg > <br>
                2. Select <b>Add to Dock</b>
            </p>
    `;
        } else {
            // iOS
            instructionHTML = `
        < p style = "color:#fff; font-size:14px; margin-bottom:15px;" >
            1. Tap Share < svg width = "14" height = "14" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke - width="2" ><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg > <br>
                2. Select <b>Add to Home Screen</b>
            </p>
    `;
        }

        container.innerHTML = `
        < h3 style = "color:#00ff00; margin-top:0;" > INSTRUCTIONS</h3 >
            ${instructionHTML}
    <button id="pwaInstructionClose" style="background:#00ff00; color:#000; border:none; padding:8px 20px; border-radius:4px; font-weight:bold; cursor:pointer; margin-top:10px;">GOT IT</button>
    `;

        container.querySelector('#pwaInstructionClose').addEventListener('click', closePopup);
    }
}

// 3. Trigger Logic

// A. Android / Desktop (beforeinstallprompt)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Show popup immediately or after a slight delay
    setTimeout(() => {
        showInstallPopup(false, 'Android/PC');
    }, 2000);
});

// B. iOS / Mac Check
function checkApplePlatform() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) return;

    // We only want to prompt once per session or use logic to not annoy user.
    // For now, we trigger it once on load if it's the right platform.

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const isIpadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 && !isIos && !isIpadOS;

    if (isIos || isIpadOS) {
        setTimeout(() => showInstallPopup(true, isIpadOS ? 'iPad' : 'iOS'), 2000);
    } else if (isMac) {
        // Only show if it's Safari (guessing based on lack of beforeinstallprompt)
        // We can't be 100% sure but if deferredPrompt never fired after a few seconds...
        setTimeout(() => {
            if (!deferredPrompt) {
                showInstallPopup(false, 'Mac');
            }
        }, 3000);
    }
}

window.addEventListener('load', checkApplePlatform);
