# ⏳ Chronos

**The World's First Experiential Time Market**

Chronos is a dynamic yield-management platform that transforms human time into a tradeable asset. We match individuals who have surplus time with B2B partners who need immediate audience density—solving the "perishable inventory" crisis in the physical world and the "cold-start" algorithm problem in the digital world.

---

## 🚀 The Time-Yield Engine

The platform operates on a dual-sided marketplace:

### 📍 The Physical Engine
Experiential businesses (cafes, events, real estate) face a perishable inventory crisis. An empty seat represents a 100% loss of potential revenue and damages social proof.
* **Geofenced Bounties:** Users accept bounties to occupy empty local spaces.
* **Verified Presence:** Secure QR check-ins and dwell-time monitoring.
* **Result:** Guaranteed physical footfall and organic hype.

### 💻 The Digital Engine
Content creators, OTT platforms, and game developers spend millions on marketing but struggle to guarantee "Day-One Concurrent Users".
* **Trigger the Algorithm:** Users stream new content or populate multiplayer game servers.
* **Attention Checks:** Randomized prompts prevent "AFK Farming".
* **Result:** Guaranteed digital attention to trigger organic trending algorithms.

---

## 💎 Features of this Prototype

This frontend prototype was built to demonstrate the core aesthetic and functionality for pitch panels:
- **Interactive 3D UI:** Custom 3D objects (Hourglass, Gold Coins, Torus) built with `Three.js` and `@react-three/fiber` that elegantly float, auto-rotate, and react to scrolling.
- **Scroll-Triggered Parallax:** Elegant scroll animations and page transitions powered by `framer-motion`.
- **Geographic Map View:** An interactive map view using `react-leaflet` to display physical bounties (mocked in Bangalore, India).
- **Dual Dashboards:** Beautiful, minimalist Light-themed dashboards for both "Earners" and "Business Partners".

---

## 🛠️ Tech Stack

- **Framework:** React 18 (Vite), TypeScript
- **Styling:** Vanilla CSS
- **3D Rendering:** Three.js, @react-three/fiber, @react-three/drei
- **Animations:** Framer Motion
- **Maps:** Leaflet, React-Leaflet
- **Icons:** Lucide React

---

## ⚙️ Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Harsh-Panchal-1/Chronos.git
   cd Chronos
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Note: `--legacy-peer-deps` is used to resolve React 19 and react-three-fiber peer dependency overlaps during prototyping).*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the platform:**
   Open `http://localhost:5173/` in your browser.
