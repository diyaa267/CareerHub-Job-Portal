import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';
import { listJobs } from '../../../lib/store';
export const dynamic='force-dynamic';
export async function GET(req:Request){const {searchParams}=new URL(req.url);const q=(searchParams.get('q')||'').trim();const mode=searchParams.get('mode')||'ALL';const type=searchParams.get('type')||'ALL';try{const db=getDb();const jobs=await db.job.findMany({where:{status:'OPEN',...(mode!=='ALL'?{workMode:mode as any}:{}),...(type!=='ALL'?{employmentType:type as any}:{}),...(q?{OR:[{title:{contains:q,mode:'insensitive'}},{company:{contains:q,mode:'insensitive'}},{location:{contains:q,mode:'insensitive'}},{skills:{has:q}}]}:{})},orderBy:[{featured:'desc'},{createdAt:'desc'}],include:{_count:{select:{applications:true}}}});return NextResponse.json(jobs.length?jobs:listJobs({q,mode,type}))}catch{return NextResponse.json(listJobs({q,mode,type}))}}
