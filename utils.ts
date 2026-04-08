@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-light: #ffffff;
  --color-dark: #0a0a0f;
}

* {
  scroll-behavior: smooth;
}

body {
  font-family:
    "Inter Variable",
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    "Noto Sans",
    sans-serif;
  color: white;
  background: #0a0a0f;
  -webkit-font-smoothing: antialiased;
}

/* Glassmorphism card */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

/* Scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(139, 92, 246, 0.3);
  border-radius: 2px;
}

/* Animations */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

@keyframes scroll-line {
  0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
  50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
  100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-1000 {
  animation-delay: 1s;
}

.animate-scroll-line {
  animation: scroll-line 2s ease-in-out infinite;
}

/* Auth fields (keep for compatibility) */
.auth-input-field {
  @apply w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-violet-500/50 focus:ring-0 outline-none transition-colors text-white placeholder-white/30;
}

.auth-button {
  @apply w-full px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed;
}
