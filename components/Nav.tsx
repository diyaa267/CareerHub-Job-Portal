'use client';
import Link from 'next/link';
import {BriefcaseBusiness,Search,UserRound,LayoutDashboard,Plus,Menu,X,ChevronDown} from 'lucide-react';
import {useState} from 'react';

export default function Nav(){
 const [open,setOpen]=useState(false);
 const close=()=>setOpen(false);
 return <header className="sticky top-0 z-50 border-b border-white/[.07] bg-[#080a09]/90 backdrop-blur-2xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
   <Link href="/" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-green-400 text-black shadow-[0_0_28px_rgba(74,222,128,.16)]"><BriefcaseBusiness size={18}/></span>
    Career<span className="text-green-400">Hub</span>
   </Link>
   <nav className="hidden items-center gap-1 md:flex">
    <Link href="/jobs" className="rounded-lg px-3.5 py-2 text-sm text-zinc-300 hover:bg-white/[.05] hover:text-white">Find jobs</Link>
    <Link href="/candidate" className="rounded-lg px-3.5 py-2 text-sm text-zinc-300 hover:bg-white/[.05] hover:text-white">My career</Link>
    <Link href="/recruiter" className="rounded-lg px-3.5 py-2 text-sm text-zinc-300 hover:bg-white/[.05] hover:text-white">For employers</Link>
    <Link href="/admin" className="rounded-lg px-3.5 py-2 text-sm text-zinc-300 hover:bg-white/[.05] hover:text-white">Insights</Link>
   </nav>
   <div className="flex items-center gap-2">
    <Link href="/jobs" aria-label="Search jobs" className="hidden rounded-lg border border-white/10 p-2.5 text-zinc-300 hover:bg-white/[.05] hover:text-white sm:block"><Search size={17}/></Link>
    <Link href="/recruiter" className="hidden rounded-lg bg-green-400 px-4 py-2.5 text-sm font-extrabold text-black hover:-translate-y-0.5 sm:block"><Plus size={15} className="mr-1 inline"/>Post a job</Link>
    <Link href="/profile" className="rounded-lg border border-white/10 px-3 py-2.5 text-sm text-zinc-200 hover:bg-white/[.05]"><UserRound size={15} className="mr-1 inline"/>Profile</Link>
    <button onClick={()=>setOpen(!open)} aria-label="Open menu" className="rounded-lg border border-white/10 p-2.5 md:hidden">{open?<X size={18}/>:<Menu size={18}/>}</button>
   </div>
  </div>
  {open&&<div className="border-t border-white/10 bg-[#080a09] px-5 py-3 md:hidden"><div className="mx-auto grid max-w-7xl gap-1">
   <Link onClick={close} href="/jobs" className="rounded-xl p-3 text-sm">Find jobs</Link>
   <Link onClick={close} href="/candidate" className="rounded-xl p-3 text-sm">My career</Link>
   <Link onClick={close} href="/profile" className="rounded-xl p-3 text-sm">Profile</Link>
   <Link onClick={close} href="/recruiter" className="rounded-xl p-3 text-sm">For employers</Link>
   <Link onClick={close} href="/admin" className="rounded-xl p-3 text-sm">Insights</Link>
  </div></div>}
 </header>
}
