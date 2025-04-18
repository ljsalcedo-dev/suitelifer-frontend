import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

// base folder contains the base styles
import "./css/base/theme.css";
import "./css/base/typography.css";
import "./css/base/fontsizes.css";

// responsive folder contains the responsive styles
import "./css/responsive/footer.css";
import "./css/responsive/home.css";
import "./css/responsive/about.css";
import "./css/responsive/careers.css";
import "./css/responsive/news.css";
import "./css/responsive/newsletter.css";

// animations folder contains the animations styles
import "./css/animation/animation.css";

import "swiper/css";

import App from "./App.jsx";

// PWA Config
import { registerSW } from "virtual:pwa-register";
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* TODO by Hernani: Use the original package of React Helmet when it supports React 19
      See:
      (Alternative) https://www.npmjs.com/package/@dr.pogodin/react-helmet
      (Original) https://www.npmjs.com/package/react-helmet-async
  */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
