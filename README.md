# Nextjs Job Board

## Technologies Used

- **Next.js**: A powerful React framework for building web applications.
- **Prisma ORM**: A database toolkit for type-safe database access.
- **PostgreSQL**: A robust relational database system for data storage.
- **Clerk**: Used for secure and user-friendly authentication.
- **Shadcn**: A versatile library enhancing various aspects of web development.
- **Zod**: Employed for schema validation to ensure data integrity.
- **Tailwind CSS**: A utility-first CSS framework for streamlined styling.
- **Vercel**: The deployment platform for a smooth and reliable hosting environment.
- **Blob Storage (Vercel)**: Efficient storage solution for handling images.

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and configure the following variables:

   ```env
   POSTGRES_URL=
   POSTGRES_PRISMA_URL=
   POSTGRES_URL_NO_SSL=
   POSTGRES_URL_NON_POOLING=
   POSTGRES_USER=
   POSTGRES_HOST=
   POSTGRES_PASSWORD=
   POSTGRES_DATABASE=
   BLOB_READ_WRITE_TOKEN=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   ```

4. **Database Migration:**
   Run Prisma migrations to initialize the database schema.

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Development Server:**

   ```bash
   npm run dev
   ```

6. **Access the Application:**
   Open your browser and visit `http://localhost:3000` to view the application.
