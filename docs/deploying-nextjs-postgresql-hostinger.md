Deploying a Next.js application with a PostgreSQL database to Hostinger requires integrating frontend deployment workflows with backend database configuration. Here’s a structured analysis of the process:

---

### **Frontend Deployment (Next.js)**
Hostinger supports **static site hosting** via FTP/SFTP or **VPS-based deployments** for full-stack Node.js applications:

#### **Static Export Approach**
1. **Configure `next.config.mjs`** for static output:
   ```javascript
   const nextConfig = {
     output: "export",
     basePath: process.env.BASE_PATH || "",
     assetPrefix: process.env.URL || undefined,
   };
   ```
   This generates static files in `/out` during `next build`[1][3].

2. **Automate Deployment via GitLab CI/CD**:
   ```yaml
   image: node:21-alpine
   before_script:
     - apk add lftp
     - npm install
   deploy:
     script:
       - URL=$PROD_URL BASE_PATH=$PROD_BASE_PATH npx next build
       - lftp -c "set ftp:ssl-allow yes; open -u $FTP_USER,$FTP_PASS $FTP_HOST; mirror -Rev out/ ./"
   ```
   Store FTP credentials (`FTP_HOST`, `FTP_USER`, `FTP_PASS`) as GitLab CI/CD variables[1].

#### **Node.js Server Approach**
For SSR/API routes:
1. Use Hostinger’s **Node.js VPS**:
   ```bash
   npm run build && npm start
   ```
   Ensure `package.json` includes `build`/`start` scripts[3].

---

### **PostgreSQL Database Setup**
#### **Installation on Ubuntu (Hostinger VPS)**
1. **Install via APT**:
   ```bash
   sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
   wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
   sudo apt update && sudo apt install postgresql
   ```
2. **Create Database/Role**:
   ```bash
   sudo -u postgres createdb mynextapp
   sudo -u postgres createuser --pwprompt myuser
   sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE mynextapp TO myuser;"
   ```
3. **Enable Remote Access**:
   Modify `/etc/postgresql/14/main/postgresql.conf`:
   ```ini
   listen_addresses = '*'
   ```
   Update `/etc/postgresql/14/main/pg_hba.conf`:
   ```ini
   host all all 0.0.0.0/0 md5
   ```
   Restart PostgreSQL: `sudo systemctl restart postgresql`[2][8].

---

### **Connecting Next.js to PostgreSQL**
#### **Environment Variables**
Store credentials securely in Hostinger’s dashboard (**Websites → Databases → Management**)[8]:
```env
POSTGRES_URL=postgres://myuser:mypassword@hostinger-vps-ip:5432/mynextapp
```

#### **Using Prisma ORM**
1. **Schema Setup** (`prisma/schema.prisma`):
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("POSTGRES_URL")
   }
   
   model Post {
     id        String @id @default(cuid())
     title     String
     content   String?
   }
   ```
2. **Database Migrations**:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
3. **Query Example** (Next.js API route):
   ```javascript
   import { PrismaClient } from '@prisma/client';
   
   export default async function handler(req, res) {
     const prisma = new PrismaClient();
     const posts = await prisma.post.findMany();
     res.status(200).json(posts);
   }
   ```
[10]

---

### **Deployment Workflow**
| Step | Frontend (Next.js) | Database (PostgreSQL) |
|------|---------------------|------------------------|
| **Build** | `next build` generates `/out` (static) or SSR bundle | Schema migrated via Prisma |
| **Deploy** | Upload via GitLab CI/CD/FTP to Hostinger | Configured on Ubuntu VPS |
| **Runtime** | Static files served via CDN or Node.js server | Accessible via `psql`/Prisma client |

---

### **Key Considerations**
- Use **environment variables** for database credentials to avoid hardcoding[4][10].
- For static sites, limit dynamic features (e.g., API routes require Node.js hosting)[3].
- Secure PostgreSQL with firewall rules and least-privilege access[2][8].
- Monitor performance using Hostinger’s VPS tools or integrate third-party analytics[4].

By combining Hostinger’s infrastructure with automated deployment pipelines and modern ORMs like Prisma, you can achieve a scalable full-stack deployment[1][10].