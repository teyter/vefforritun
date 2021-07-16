import { promises } from 'fs';
import faker from 'faker';
import { readFile } from 'fs/promises';
import { query, end } from './db.js';

const schemaFile = './sql/schema.sql';

function commentStats() {
  if (Math.random() > 0.5) {
    return faker.lorem.sentence();
  } return '';
}

async function fakeData(n) {
  for (let i = 0; i < n; i += 1) {
    const name = faker.name.findName();
    const nationalId = faker.random.number({ min: 1000000000, max: 9999999999 });
    const comment = commentStats();
    const anonymous = faker.random.boolean();
    const signed = faker.date.recent(14);

    const q = `INSERT INTO signatures (name, nationalId, comment, anonymous, signed)
      VALUES ($1, $2, $3, $4, $5)`;

    await query(q, [name, nationalId, comment, anonymous, signed]);   //eslint-disable-line
  }
}

async function create() {
  const data = await readFile(schemaFile);

  await query(data.toString('utf-8'));

  await fakeData(500);

  await end();

  console.info('Schema created');
}

create().catch((err) => {
  console.error('Error creating schema', err);
});
