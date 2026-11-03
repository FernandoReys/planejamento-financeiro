import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Planejamento Financeiro',description:'Seu dinheiro, com direção.',manifest:'/manifest.webmanifest',icons:{icon:'/icon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
