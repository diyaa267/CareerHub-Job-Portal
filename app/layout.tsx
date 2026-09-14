import './globals.css';import Nav from '../components/Nav';
export const metadata={title:'CareerHub — Modern Job Portal',description:'A modern skills-first recruitment platform for candidates and employers.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Nav/>{children}<footer className="mt-12 border-t border-white/[.07] py-10 text-center text-sm text-zinc-600">CareerHub © 2026 · Skills-first hiring, designed for the modern web</footer></body></html>}
