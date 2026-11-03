import {NextResponse,type NextRequest} from 'next/server';
import type {EmailOtpType} from '@supabase/supabase-js';
import {createClient} from '../../../lib/supabase/server';
export async function GET(request:NextRequest){const url=request.nextUrl;const code=url.searchParams.get('code'),token_hash=url.searchParams.get('token_hash'),type=url.searchParams.get('type');const client=await createClient();if(code){const {error}=await client.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL('/',request.url));}if(token_hash&&type==='signup'){const {error}=await client.auth.verifyOtp({token_hash,type:type as EmailOtpType});if(!error)return NextResponse.redirect(new URL('/',request.url));}return NextResponse.redirect(new URL('/login?message=invalid',request.url));}
