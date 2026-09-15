import { PrismaClient, Role, WorkMode, EmploymentType } from '@prisma/client';

const db = new PrismaClient();

const jobs = [
  {
    title: 'Software Engineer',
    company: 'Google',
    location: 'Bengaluru, India',
    workMode: WorkMode.HYBRID,
    employmentType: EmploymentType.FULL_TIME,
    salary: '1800000-3200000',
    skills: 'JavaScript,TypeScript,Python,DSA,React',
    description:
      'Build reliable products used by millions of people. Work with product and engineering teams to ship high-quality software.',
  },
  {
    title: 'Frontend Developer',
    company: 'Razorpay',
    location: 'Bengaluru, India',
    workMode: WorkMode.HYBRID,
    employmentType: EmploymentType.FULL_TIME,
    salary: '1000000-1800000',
    skills: 'React,Next.js,TypeScript,CSS',
    description:
      'Create fast, accessible and polished financial product experiences.',
  },
  {
    title: 'Python Developer Intern',
    company: 'TechNova Labs',
    location: 'Remote - India',
    workMode: WorkMode.REMOTE,
    employmentType: EmploymentType.INTERNSHIP,
    salary: '15000-25000',
    skills: 'Python,Flask,SQL,Git',
    description:
      'Join a product engineering team and build real APIs, automations and internal tools.',
  },
  {
    title: 'AI/ML Engineer',
    company: 'Microsoft',
    location: 'Hyderabad, India',
    workMode: WorkMode.HYBRID,
    employmentType: EmploymentType.FULL_TIME,
    salary: '1800000-3000000',
    skills: 'Python,Machine Learning,SQL,NLP',
    description:
      'Build applied ML systems and intelligent experiences with measurable customer impact.',
  },
  {
    title: 'Backend Developer',
    company: 'Flipkart',
    location: 'Bengaluru, India',
    workMode: WorkMode.ONSITE,
    employmentType: EmploymentType.FULL_TIME,
    salary: '1200000-2200000',
    skills: 'Java,Node.js,PostgreSQL,REST API',
    description:
      'Design scalable backend services for high-volume commerce workflows.',
  },
  {
    title: 'Data Analyst',
    company: 'Deloitte',
    location: 'Ahmedabad, India',
    workMode: WorkMode.HYBRID,
    employmentType: EmploymentType.FULL_TIME,
    salary: '700000-1200000',
    skills: 'SQL,Python,Power BI,Excel',
    description:
      'Turn business data into insights and dashboards that support better decisions.',
  },
  {
    title: 'UI/UX Designer',
    company: 'Zomato',
    location: 'Gurugram, India',
    workMode: WorkMode.HYBRID,
    employmentType: EmploymentType.FULL_TIME,
    salary: '900000-1600000',
    skills: 'Figma,UX Research,Prototyping',
    description:
      'Design simple, delightful experiences across consumer products.',
  },
  {
    title: 'DevOps Engineer',
    company: 'Infosys',
    location: 'Pune, India',
    workMode: WorkMode.ONSITE,
    employmentType: EmploymentType.FULL_TIME,
    salary: '900000-1500000',
    skills: 'AWS,Docker,CI/CD,Linux',
    description:
      'Improve delivery pipelines, reliability and cloud infrastructure.',
  },
];

async function main() {
  await db.application.deleteMany();
  await db.job.deleteMany();
  await db.user.deleteMany();

  const recruiter = await db.user.create({
    data: {
      name: 'CareerHub Recruiter',
      email: 'recruiter@careerhub.demo',
      role: Role.RECRUITER,
      headline: 'Talent Acquisition',
      location: 'India',
      skills: 'Recruiting,Hiring',
    },
  });

  await db.user.create({
    data: {
      name: 'Demo Candidate',
      email: 'candidate@careerhub.demo',
      role: Role.CANDIDATE,
      headline: 'Software Developer',
      location: 'Ahmedabad, India',
      skills: 'Java,Python,SQL,JavaScript,React',
    },
  });

  await db.user.create({
    data: {
      name: 'CareerHub Admin',
      email: 'admin@careerhub.demo',
      role: Role.ADMIN,
      headline: 'Platform Admin',
      location: 'India',
      skills: '',
    },
  });

  for (const job of jobs) {
    await db.job.create({
      data: {
        ...job,
        recruiterId: recruiter.id,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });