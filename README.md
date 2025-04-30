
# Netsift

A full-stack, modular web-scraping platform enabling authenticated users to design, schedule and monitor data-extraction workflows. Netsift combines a visual pipeline builder, real-time logging, role-based access control and subscription management to deliver a scalable solution for automated data gathering and reporting.

---

## Table of Contents

1. Key Features  
2. Architecture Overview  
3. Tech Stack  
4. Getting Started  
   - Prerequisites  
   - Installation  
   - Environment Variables  
   - Database Setup  
   - Running the Application  
5. Usage  
   - User Registration & Authentication  
   - Creating a Scrape Workflow  
   - Scheduling & Monitoring  
6. Subscription & Monetization  
7. Contributing  
8. License  

---

## Key Features

- **Visual Pipeline Builder**: Drag-and-drop interface for defining multi-step scraping flows.  
- **Flexible Scheduling**: Cron-expression support with human-readable previews.  
- **Subscription Management**: Stripe integration for freemium and paid plans.  
- **Dynamic Dashboards**: Interactive charts and tables for quick data insights.  

---

## Architecture Overview

Frontend (Next.js, Tailwind) <--> Backend (Express + Prisma) <--> MySqlite 
↕  
Scraping Engine (Puppeteer, Cheerio)  
↕  
Scheduler (cron-parser, cronstrue)  
↕  
Visualization (Recharts)

---

## Tech Stack

**Frontend**:  
- Next.js (React framework)  
- Tailwind CSS  
- Clerk (authentication)  
- React Hook Form + Zod (validation)  
- XYFlow (pipeline builder)  

**Backend & Database**:  
- Node.js + Express  
- Prisma ORM + PostgreSQL  
- cron-parser & cronstrue (scheduling)  

**Scraping Engine**:  
- Puppeteer (dynamic content)  
- Cheerio (static HTML)  

**Visualization**:  
- Recharts  

**Payments**:  
- Stripe  

---

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Yarn or npm  

### Installation

1. Clone the repository:  
   `git clone https://github.com/your-org/netsift.git`  
   `cd netsift`

2. Install dependencies:  
   `yarn install`  
   *or*  
   `npm install`

### Environment Variables

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG9ldGljLWFudGVsb3BlLTcyLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_uBABjgJH1ZFrnZfhJAgTXScfysieTn6PEqAhpKo5HV

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/setup

NEXT_PUBLIC_DEV_MODE=false

NEXT_PUBLIC_APP_URL=http://localhost:3000

API_SECRET=f5PgCVBeVMk4Ukd6SQ3F6kWGn6Y4HeWY8knH9HnuwD5zLSfN9J3pr2KTrTNBa5tm

ENCRYPTION_KEY=a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a

#STRIPE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51RDdL92LSOcjqQTnllxoG9O3T7yVYIUQifKhfuAAxQJ17BKLRENUnUV3LfccsLNYX9pvUZGZqHqGBl6xVSDxGpW100JdUlDa9n
STRIPE_SECRET_KEY=sk_test_51RDdL92LSOcjqQTnjN6Yulj56QiIRFLPRljKyTbaYC6QlB90BHaoBwjCu47RgsL2Yv8xBfpfTDqA2PMvG4JN7rNx00yRRYMN9R

STRIPE_SMALL_PACK_PRICE_ID=price_1RDdZ32LSOcjqQTnQz4TYWSk
STRIPE_MEDIUM_PACK_PRICE_ID=price_1RDdZu2LSOcjqQTnz7SGuMZ0
STRIPE_LARGE_PACK_PRICE_ID=price_1RDdaa2LSOcjqQTntF27u724

STRIPE_WEBHOOK_SECRET="whsec_57c82d6119e13b09afe4ce94cd3cbb08dac94fc714e039061ce768cd36d36413"
```

Create a `.env` file in the root:

```
DATABASE_URL="file:./dev.db"
```


### Database Setup

Run Prisma migration and generate client:

```
npx prisma migrate deploy  
npx prisma generate
```

### Running the Application

**Development**:  
- `npm run dev` command for running the app.
- `npx prisma studio` command for running the database.
### NOTE : these steps are important for live update of stripe payment and invoices generation.
- `stripe login` for starting stripe session.
- `Stripe listen --forward -to localhost:3000/api/webhooks/stripe` after stripe login
- `Stripe trigger payment_intent.succeeded` use this in new terminal after stripe listen command


---

## Usage

### User Registration & Authentication

- Sign up via clerk authenticated page.
- All authentication is managed via clerk, tan-stack query.
- All data is encrypted.

### Creating a Scrape Workflow

- Use the **Workflow Builder**  
- Drag and connect nodes (Request, Parse, Transform)  
- Define selectors, schedule, and save

### Scheduling & Monitoring

- View cron-based schedules and next run  
- Access task logs, error messages, and data status in real time

---

## Subscription & Monetization

- **Free Plan**: 100 credits provided on account creation, 
- **Premium Plan**: Purchase credits as per the requirement allowing more dynamic scraping.
- Billing handled through **Stripe**

---

## Created By

@ Harsh Vashisht [2201060157]
@ Kunal Pandey [2201060150]
