import {redirect} from 'next/navigation';
import Dashboard from '../components/finance/dashboard';
import {createClient} from '../lib/supabase/server';
import {emptyState} from '../lib/empty-state';
import type {State} from '../lib/finance';
export const dynamic='force-dynamic';
export default async function Page(){if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||!process.env.OWNER_EMAIL)redirect('/login?message=setup');const client=await createClient();const {data:{user}}=await client.auth.getUser();if(!user)redirect('/login');if(!user.email_confirmed_at||user.email?.toLowerCase()!==process.env.OWNER_EMAIL?.toLowerCase())redirect('/login?message=denied');const {data,error}=await client.from('financial_state').select('data,revision').eq('user_id',user.id).maybeSingle();if(error)throw new Error('Não foi possível acessar o banco financeiro.');let current=data;if(!current){const {data:created,error:insertError}=await client.from('financial_state').insert({user_id:user.id,data:emptyState(),revision:0}).select('data,revision').single();if(insertError||!created)throw new Error('Não foi possível inicializar o planejamento.');current=created;}return <Dashboard initialState={current.data as State} initialRevision={current.revision} userEmail={user.email!}/>;}
