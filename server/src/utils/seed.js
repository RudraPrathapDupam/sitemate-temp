import faker from 'faker';
import { join } from 'path';

import Issue from '../models/Issue.js';

export const seedDb = async () => {
  console.log('Seeding database...');

  await Issue.deleteMany({});

  // create 9 issues
  const issuePromises = [...Array(9).keys()].map((index, i) => {
    const issue = new Issue({
      title: faker.lorem.sentences(1),
      description: faker.lorem.sentences(5)
    });
    return issue;
  });

  await Promise.all(
    issuePromises.map(async (issue) => {
      await issue.save();
    }),
  );

  const issues = await Issue.find();
  console.log("Seeded: ",issues);
 
};
