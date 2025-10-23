import { execSync } from 'child_process';
import fs from 'fs';


const output = execSync('git log --since="1 month ago" --pretty=oneline').toString();
const commitCount = output.split('\n').filter(Boolean).length;


let classification = 'Inactive';
if (commitCount >= 30) classification = 'Highly Productive';
else if (commitCount >= 15) classification = 'Productive';
else if (commitCount >= 5) classification = 'Moderately Active';
else classification = 'Low Activity';


const result = {
  month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
  commits: commitCount,
  classification,
};

fs.writeFileSync('productivity.json', JSON.stringify(result, null, 2));
console.log(`✅ Productivity for this month: ${classification} (${commitCount} commits)`);
