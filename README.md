# ⚡ Personal Portfolio Website

A high-performance, interactive portfolio built to showcase creative engineering. Designed with a **playful, neon-infused aesthetic**, it features 3D physics simulations, glassmorphic UI, and smooth scroll animations.

![Portfolio Banner](public/opengraph-image.png)

## 🎨 Key Features

### **Aesthetic & Design**
*   **Neon & Glassmorphism**: A cohesive dark theme accented with vibrant Lime/Purple gradients and liquid glass cards.
*   **Custom Typography**: A mix of **Syne** (Outline/Bold Display) and **Space Grotesk** (Body) for a distinct, modern look.
*   **Dynamic Backgrounds**: Geometric grid patterns and floating shapes that react to scroll and mouse movement.

### **Interactive Elements**
*   **3D Project Cards**: Physics-based tilt effects with spotlight gradients on hover.
*   **Falling Icons**: A Matter.js simulation in the Hero section where tech stack icons fall and interact with physics.
*   **Timeline Experience**: A futuristic, connected timeline for work experience.
*   **Glitch Headers**: Unique, retro-inspired headers for the Projects section.

### **Functional Core**
*   **Secure Contact Form**: Integrated with **Resend** service, featuring rate limiting, input sanitization, and real-time success/error feedback.
*   **Resume Download**: One-click professional resume download button.
*   **Smart Dock**: macOS-style floating dock for quick navigation.

---

## 🛠️ Tech Stack

### **Frontend**
*   **Next.js 16 (App Router)**: Server Components and modern routing.
*   **React 19**: Utilizing the latest hooks and Server Actions.
*   **Tailwind CSS**: Utility-first styling for the entire custom design system (No CSS Modules!).
*   **Framer Motion**: Complex layout animations and scroll-trigger effects.
*   **Lucide React**: Consistent, lightweight icon set.

### **Animations**
*   **Matter.js**: 2D rigid body physics engine.
*   **Three.js**: Lightweight 3D utility usage.

### **Backend**
*   **Node.js**: Server-side API routes.
*   **Resend Service**: Transactional email API.

---

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/UmerRizwan03/MyPortfolio.git
    cd MyPortfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file:
    ```env
    RESEND_API_KEY=re_123456...
    RESEND_FROM_EMAIL=onboarding@resend.dev
    RESEND_TO_EMAIL=your_email@example.com
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

```bash
/src
  /app          # Next.js App Router
    /api        # Server-side API routes (/send-email)
    layout.tsx  # Global fonts and metadata
    page.tsx    # Main combined landing page
  /components   # UI Components
    /ui         # Reusable primitives (GlassCard, ProjectCard)
    Hero.tsx    # Matter.js Falling Icons
    Projects.tsx # 3D Cards Grid
    Contact.tsx # Split-layout Form
  /data         # Static content
  /lib          # Utilities (cn, fonts)
```

## 📄 License
[MIT License](LICENSE)
