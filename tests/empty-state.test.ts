import {strict as assert} from 'node:assert';
import {emptyState} from '../lib/empty-state.ts';
import {monthly,project} from '../lib/finance.ts';
const a=emptyState('2026-11-04'),b=emptyState('2026-11-04');
assert.deepEqual(monthly(a),{income:0,expense:0,surplus:0});
assert.equal(a.balance,0);assert.equal(a.brother,0);assert.equal(a.entries.length,0);assert.equal(a.goals.length,0);assert.deepEqual(a.details,{});assert.equal(a.holidays.length,0);
assert.ok(project(a,'2026-11-30').every(p=>p.balance===0));
a.entries.push({id:'test',name:'Only this state',amount:100,kind:'income',day:5,paid:[],category:'Test'});assert.equal(b.entries.length,0);
console.log('Estado vazio: sem valores ou lançamentos herdados e sem referências compartilhadas.');
