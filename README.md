Blood Donor Directory

A modern and responsive Blood Donor Directory web application built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, and MongoDB.

This platform helps users quickly find blood donors by searching and filtering donor information such as blood group, address, and availability.

Features
Modern responsive UI
Blood donor registration
Edit donor information
Search donors by:
Name
Phone number
Address
Filter donors by blood group
Availability status
Last donation date
Toast notifications
Form validation using Zod
React Hook Form integration
MongoDB database with Mongoose
Server Actions & API Routes
Clean reusable component architecture
Tech Stack
Next.js 15+ App Router
TypeScript
Tailwind CSS
shadcn/ui
Lucide Icons
MongoDB
Mongoose
React Hook Form
Zod
Sonner Toast

Project Structure:

src/
│
├── app/
│   ├── api/
│   │   └── donor/
│   │       └── route.ts
│   │
│   ├── actions/
│   │   └── donor.actions.ts
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── SearchBar.tsx
│   ├── DonorList.tsx
│   ├── DonorCard.tsx
│   ├── RegisterModal.tsx
│   └── EditModal.tsx
│
├── lib/
│   ├── db.ts
│   ├── actions.ts
│   ├── utils.ts
│   └── validations.ts
│
├── models/
│   └── donor.model.ts
│
└── types/
    └── index.ts