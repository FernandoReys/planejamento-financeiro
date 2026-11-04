import type {State} from './finance.ts';
export function emptyState(reference=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())):State{return {balance:0,reference,entries:[],brother:0,carIncludesNovember:'unknown',goals:[],holidays:[],details:{}};}
