import type {State} from '../lib/finance.ts';
// Synthetic data exclusively for deterministic unit checks.
export const initial:State={balance:5000,reference:'2026-11-03',brother:500000,carIncludesNovember:'unknown',holidays:[],goals:[],entries:[
{id:'salary15',name:'Income A',amount:100000,kind:'income',day:15,category:'Test',paid:[],advance:true},
{id:'rent',name:'Income B',amount:50000,kind:'income',day:20,category:'Test',paid:[]},
{id:'salary30',name:'Income C',amount:100000,maximum:110000,kind:'income',day:30,category:'Test',paid:[],advance:true},
{id:'car',name:'Expense A',amount:50000,kind:'expense',day:13,category:'Test',paid:['2026-11']},
{id:'brother',name:'Expense B',amount:50000,kind:'expense',day:30,category:'Test',paid:[]},
{id:'unknown',name:'Expense C',amount:5000,kind:'expense',day:null,category:'Test',paid:[]} ]};
