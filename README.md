# Algerie Telecom Skill Center Platform

A modern, full-stack web platform designed for the Algerie Telecom Skill Center. This application manages content (news, events, testimonials), showcases the center's facilities, and handles user registrations for various training programs and spaces.

## 🚀 Project Overview

The platform serves as a digital gateway for the Skill Center, providing:
- **Dynamic Content Management:** Admins can easily manage hero slides, news, events, and testimonials.
- **Multilingual Support:** Full support for English, French, and Arabic (RTL).
- **Registration System:** Users can register for courses or book spaces (Coworking, Podcast, etc.) with specific routing to center locations (Annaba, Setif).
- **Interactive UI:** A highly responsive and animated user interface featuring distinct "Space" experiences (Coworking, Podcast, Community).

## 🛠️ Tech Stack

### Client (Frontend)
- **Framework:** [React 18](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (based on Radix UI)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management & Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Internationalization:** [i18next](https://www.i18next.com/)
- **Routing:** [React Router](https://reactrouter.com/)

### Server (Backend)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** JWT (JSON Web Tokens)
- **File Handling:** Multer (for image uploads)
- **Validation:** Zod

## 📦 Prerequisites

Ensure you have the following installed:
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **PostgreSQL** database

## 🏃‍♂️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Seggar-zackaria/algerie-telecome.git
cd algerie-telecome
```

### 2. Database Setup
Create a PostgreSQL database and create a `.env` file in the `server` directory:

```env
# server/.env
DATABASE_URL="postgresql://user:password@localhost:5432/algerie_telecom_db?schema=public"
JWT_SECRET="your_super_secret_key"
PORT=5000
RESEND_API_KEY='re_'
```

### 3. Backend Setup
Navigate to the server directory, install dependencies, and setup the database:

```bash
cd server
npm install

# Run database migrations
npx prisma migrate dev

# Seed the database with initial admin and sample data
npx prisma db seed
```
> **Default Admin Credentials:**
> - Email: `admin@example.com`
> - Password: `password123`

### 4. Frontend Setup
Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:
```env
# client/.env
VITE_API_URL="http://localhost:5000/api"
VITE_UPLOAD_URL="http://localhost:5000"
```

### 5. Running the Application
You can run both client and server concurrently from the root directory (if configured) or separately.

**Server:**
```bash
cd server
npm run dev
```

**Client:**
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`.
