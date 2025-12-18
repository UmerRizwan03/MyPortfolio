# Personal Portfolio Website

A modern, interactive personal portfolio website designed to showcase my skills, projects, and experience as a Full-Stack Developer. Built with performance and aesthetics in mind, it features 3D simulations, smooth physics-based animations, and a seamless responsive design.

![Portfolio Banner](public/opengraph-image.png)

## 🚀 Key Features

*   **Immersive 3D Interactions**: Physics-based falling icons and geometric animations using Matter.js, Three.js, and Framer Motion.
*   **Interactive Project Cards**: 3D tilt-enabled cards that expand into detailed popup modals with rich media, comprehensive descriptions, and "glassmorphism" aesthetics.
*   **Smart Theme System**: A fully integrated Dark/Light mode with a unique physics-based "pull-lamp" toggle that features sound effects and dynamic lighting.
*   **Secure Contact Form**: A functional email system powered by **Resend**, secured with:
    *   **Rate Limiting**: Limits requests per IP to prevent spam.
    *   **Input Sanitization**: Protects against HTML injection attacks.
    *   **Real-time Feedback**: Instant success/error notifications.
*   **Resume Download**: Direct access to download the professional resume from the About section.
*   **Modern UI/UX**: Clean, accessible design utilizing **ShadCN UI** components and utility-first **Tailwind CSS**.
*   **Performance First**: Built on **Next.js 16** with **Turbopack** for lightning-fast loading, optimized images (`next/image`), and smooth 60fps animations.
*   **Responsive Design**: Fully optimized layouts for desktops, tablets, and mobile devices.

## 🛠️ Tech Stack

### Core Framework
*   **Next.js 16**: The latest App Router framework for server-side rendering and static generation.
*   **React 19**: Leveraging the newest React features including Server Actions.
*   **TypeScript**: Ensuring robust code quality with static typing.

### Styling & Animation
*   **Tailwind CSS**: Utility-first CSS framework for rapid and consistent UI development.
*   **Framer Motion**: Powering complex layout animations, gestures, and the scroll-linked interactions.
*   **Matter.js**: 2D physics engine for the "falling icons" simulation.
*   **Three.js**: 3D graphics rendering for geometric backgrounds.
*   **ShadCN UI**: Accessible, reusable component primitives based on Radix UI.
*   **Lucide React**: Beautiful, consistent open-source icons.

### Backend & Services
*   **Resend Service**: High-deliverability email API for the contact form.
*   **Node.js Runtime**: For server-side API routes.

## ⚡ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
*   **Node.js 18+** installed.
*   **npm** or **yarn** package manager.

### Installation

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
    Create a `.env.local` file in the root directory and add your Resend credentials to enable the contact form:
    ```env
    # Resend API Key for sending emails
    RESEND_API_KEY=re_123456789

    # Email address to send FROM (must be verified in Resend)
    RESEND_FROM_EMAIL=onboarding@resend.dev

    # Your email address to receive inquiries
    RESEND_TO_EMAIL=your_email@example.com
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
/src
  /app          # Next.js App Router (Pages & API Routes)
    /api        # Server-side API routes (e.g., /send-email)
    layout.tsx  # Root layout and global metadata
    page.tsx    # Main landing page
  /components   # Reusable UI components
    /ui         # ShadCN and generic UI primitives
    ProjectCard.tsx # 3D interactive project card
    ThemeToggle.tsx # Physics-based lamp toggle
  /data         # Static content (Projects, etc.)
  /lib          # Utilities (Styling, helpers)
/public         # Static assets (Resume, Images, Logos)
```

## 🏗️ Build & Deploy

To create a production-optimized build:

```bash
npm run build
```

### Deployment
This project is optimized for deployment on **Vercel** (creators of Next.js) or **Firebase Hosting**.

**For Vercel:**
Simply import your GitHub repository into Vercel, adding the **Environment Variables** configured above.

## ⚠️ Known Issues
*   **Browser Warnings**: You may see minor warnings related to `framer-motion` scroll offsets or hydration mismatches in development mode. These are actively managed and do not affect production builds.
*   **Mobile Performance**: Physics simulations are optimized but may be resource-intensive on very old mobile devices.

## 🔮 Future Improvements
*   [ ] Integration of Firebase Authentication for an admin dashboard.
*   [ ] Dynamic blog section using a Headless CMS.
*   [ ] CI/CD Pipeline integration.

## 📄 License
[MIT License](LICENSE)
