# My Portfolio

A modern, interactive personal portfolio website designed to showcase my skills, projects, and experience as a Full-Stack Developer. Built with performance and aesthetics in mind, it features 3D simulations, smooth physics-based animations, and a seamless responsive design.

## 🚀 Key Features

*   **Immersive 3D Interactions**: Physics-based falling icons and geometric animations using Matter.js and Framer Motion.
*   **Detailed Project Perspectives**: Interactive project cards that expand into detailed popup modals with rich media and comprehensive descriptions.
*   **Modern UI/UX**: Clean, glassmorphism-inspired design with ShadCN UI components and Tailwind CSS.
*   **Interactive Dock**: macOS-style floating dock with a physics-based interactive lamp for theme toggling.
*   **Liquid Glass Theme**: Consistent frosted glass aesthetic across all cards and interactive elements.
*   **Custom Branding**: Fully integrated custom identity with adaptive logos in the browser tab, hero section, and footer.
*   **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.
*   **Dynamic Contact Form**: Functional email system powered by Resend with real-time feedback.
*   **Performance First**: Built on Next.js 16 with Turbopack for lightning-fast loading and verified Core Web Vitals.

## 🛠️ Tech Stack

### Frontend Core
*   **Next.js 16**: App Router framework for server-side rendering and static generation.
*   **React 19**: Latest React features including Server Actions.
*   **TypeScript**: Static typing for robust code quality.
*   **Tailwind CSS**: Utility-first styling for rapid UI development.

### UI & Animations
*   **ShadCN UI**: Accessible and customizable component primitives.
*   **Framer Motion**: Complex layout animations and gestures.
*   **Matter.js**: 2D physics engine for interactive elements.
*   **Three.js**: 3D graphics rendering.
*   **Custom SVGs**: Interactive physics-based vector animations (e.g., Theme Lamp).

### Backend & Services
*   **Resend**: Email delivery API for the contact form.
*   **Firebase Authentication**: (Planned) User authentication implementation.
*   **Cloud Firestore & Storage**: (Planned) Database and asset storage.
*   **React Hook Form & Zod**: (Planned) Type-safe form validation and state management.

## 📂 Project Structure

```bash
/src
  /app          # Next.js App Router pages and API routes
  /components   # Reusable UI components
    /ui         # ShadCN and generic UI primitives
  /lib          # Utility functions and shared logic
  /public       # Static assets (images, icons)
```

## ⚡ Getting Started

### Prerequisites
*   Node.js 18+ installed
*   npm or yarn package manager

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/my-portfolio.git
    cd my-portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env.local` file in the root directory and add your Resend credentials:
    ```env
    RESEND_API_KEY=re_123456789
    RESEND_FROM_EMAIL=onboarding@resend.dev
    RESEND_TO_EMAIL=your_email@example.com
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Build & Deploy

To create a production build:

```bash
npm run build
```

### Deployment
This project is optimized for deployment on **Vercel** or **Firebase Hosting**.

**For Firebase:**
1.  Install Firebase CLI: `npm install -g firebase-tools`
2.  Login: `firebase login`
3.  Initialize: `firebase init hosting`
4.  Deploy: `firebase deploy`

## ⚠️ Known Issues
*   **Browser Warnings**: You may see minor warnings related to `framer-motion` scroll offsets in development mode. These are known and safe to ignore.
*   **Browser Support**: Physics animations may be resource-intensive on very old mobile devices.

## 🔮 Future Improvements
*   [ ] Integration of Firebase Authentication for admin dashboard.
*   [ ] Dynamic blog section using CMS.
*   [x] Dark/Light mode toggle (Interactive Lamp).

## 📄 License
[MIT License](LICENSE)
