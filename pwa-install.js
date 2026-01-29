/**
 * PWA Installation & Service Worker Handler
 * Handles cross-platform installation logic for iOS, Android, and PC.
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

// 2. Install Prompt Handling (Android/PC)
let deferredPrompt;
const installBtnId = 'pwaInstallBtn';

// Create the Install Button dynamically
function createInstallButton() {
    const taskbarContainer = document.getElementById('taskbarContainer');
    if (!taskbarContainer) return;

    if (document.getElementById(installBtnId)) return; // Already exists

    // Create App Icon style button
    const btn = document.createElement('button');
    btn.id = installBtnId;
    btn.className = 'taskbar-item'; // Reusing existing class if available, or we'll style it
    btn.title = "Install App";
    btn.innerHTML = `
        <div class="icon-box">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
        </div>
        <span class="app-name">INSTALL</span>
    `;

    // Add styles if needed (assuming taskbar items have styles)
    // We insert it at the beginning or end of taskbar
    taskbarContainer.appendChild(btn);

    btn.addEventListener('click', async () => {
        if (deferredPrompt) {
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
            btn.remove(); // Remove button after install interaction
        } else {
            // Fallback / iOS / Mac Handling
            detectAndShowInstructions();
        }
    });

    // Simple Animation entry
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(20px)';
    btn.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
    }, 100);
}

// Listen for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    console.log('PWA Install Triggered');
    createInstallButton();
});

// 3. Robust Platform Detection (iOS, iPad, Mac)
function detectAndShowInstructions() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const isIpadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 && !isIos && !isIpadOS;
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);

    // If on iOS/iPad and NOT in standalone mode
    if ((isIos || isIpadOS) && !isInStandaloneMode) {
        showInstallInstructions(isIpadOS ? 'iPad' : 'iOS');
    } else if (isMac && !isInStandaloneMode) {
        // macOS Safari check (Chrome on Mac usually triggers beforeinstallprompt, so this fallback is mostly for Safari)
        showInstallInstructions('Mac');
    }
}

function showInstallInstructions(deviceType) {
    // Determine text based on device
    let title = `INSTALL ON ${deviceType.toUpperCase()}`;
    let instructions = '';

    if (deviceType === 'Mac') {
        instructions = `
            To install on macOS (Safari):<br>
            1. Click the <b>Share</b> button <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><br>
            2. Select <b>"Add to Dock"</b>
        `;
    } else {
        // iOS / iPad
        instructions = `
            Tap the Share button <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg><br> 
            and select <b>"Add to Home Screen"</b> <span style="font-size:16px">+</span>
        `;
    }

    // Create a simple modal or tooltip
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        max-width: 350px;
        background: rgba(0, 0, 0, 0.95);
        border: 1px solid #00ff00;
        color: #fff;
        padding: 20px;
        border-radius: 12px;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.4);
        font-family: 'Arimo', sans-serif;
        text-align: center;
        backdrop-filter: blur(5px);
    `;

    modal.innerHTML = `
        <div style="margin-bottom: 10px; font-weight: bold; color: #00ff00; letter-spacing: 1px;">${title}</div>
        <p style="font-size: 14px; margin-bottom: 15px; color: #ddd; line-height: 1.5;">
            ${instructions}
        </p>
        <button id="closeIosMsg" style="background: transparent; border: 1px solid #fff; color: #fff; padding: 6px 20px; cursor: pointer; border-radius: 4px; font-size: 12px; transition: all 0.2s;">GOT IT</button>
    `;

    document.body.appendChild(modal);

    document.getElementById('closeIosMsg').addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
}

// 4. Check if already installed (Standalone mode)
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    const btn = document.getElementById(installBtnId);
    if (btn) btn.remove();
});

// Initial Check: If NOT in standalone, we might want to show the button 
// on iOS/Mac specifically so they can click it to see instructions.
// Chrome/Edge/Android handle this via 'beforeinstallprompt' which creates the button.
// But Safari/iOS don't fire that event. So we explicitly create the button for them.

const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

if (!isStandalone) {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIpadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    const isIos = /iphone|ipad|ipod/.test(userAgent) || isIpadOS;
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

    // If it's iOS, iPad, or Mac (Safari implicitly), we forcefully show the button
    // because they don't fire the event to show it automatically.
    if (isIos || isMac) {
        // We delay slightly to ensure DOM is ready if script runs early
        setTimeout(createInstallButton, 1000);
    }
}

// For testing purposes, we can uncomment this to force button appearance in DevTools
// createInstallButton();
