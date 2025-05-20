
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
