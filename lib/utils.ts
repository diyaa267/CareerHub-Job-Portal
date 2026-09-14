export const money=(n?:number|null)=>n==null?'Salary not disclosed':`₹${(n/100000).toFixed(n%100000?1:0)}L`;
export const initials=(s:string)=>s.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
