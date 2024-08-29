
const { faker} = require('@faker-js/faker');
const fetch = require('node-fetch');


const topics = [
  "Technology",
  "Health & Wellness",
  "Travel",
  "Finance",
  "Education",
  "Food & Cooking",
  "Fashion",
  "Sports",
  "Science",
  "Entertainment",
  "Politics",
  "Environment",
  "History",
  "Literature",
  "Art & Culture",
  "Business",
];
const randomTopic = topics[Math.floor(Math.random() * topics.length)];

const generateMeaningfulNewsTitle = () => {
  const structures = [
    `Breaking: ${faker.company.buzzPhrase()} in ${faker.location.city()}`,
    `Exclusive: ${faker.person.firstName()} reveals the truth about ${faker.lorem.word()}`,
    `New Study Shows: ${faker.lorem.sentence()}`,
    `Incredible: ${faker.company.catchPhrase()} in ${faker.date.past().getFullYear()}`,
    `${faker.hacker.verb()} in ${faker.company.name()}: What You Need to Know`,
    `Watch: ${faker.person.firstName()} ${faker.hacker.adjective()} at ${faker.person.lastName()}`,
    `Experts Say: ${faker.lorem.sentence()}`,
    `Analysis: The impact of ${faker.hacker.noun()} on ${faker.company.buzzPhrase()}`,
    `Alert: Earthquake hits ${faker.location.city()}`,
    `How ${faker.person.firstName()} is changing the ${faker.commerce.productAdjective()} landscape`,
  ];

  return structures[Math.floor(Math.random() * structures.length)];
};

// Function to generate a paragraph of meaningful text
const generateParagraph = () => {
  return `${faker.word.words(200)}\n\n`;
};

// Function to generate a summary of approximately 10,000 words
const generateLongSummary = (wordCount) => {
  let summary = '';
  const targetWordCount = wordCount || 1000;

  // Count words in the summary and generate until we reach the target
  let currentWordCount = 0;

  while (currentWordCount < targetWordCount) {
    const paragraph = generateParagraph();
    summary += paragraph;

    // Update current word count
    currentWordCount += paragraph.split(' ').length;
  }

  return summary.trim();
};

// Generate a meaningful summary with approximately 600 words
const longSummary = generateLongSummary(600);

// Function to generate a random rights statement
const generateRights = () => {
  const rightsStatements = [
    '© 2024 News Corp. All rights reserved.',
    'This article is licensed under Creative Commons Attribution 4.0 International.',
    '© 2024 Associated Press. Redistribution without permission is prohibited.',
    '© 2024 The Guardian. All rights reserved.',
    'Published under a Creative Commons license.',
    '© 2024 BBC News. Reproduction without permission is prohibited.',
    '© 2024 Reuters. All rights reserved. Use of this content requires proper attribution.',
    '© 2024 Al Jazeera. All rights reserved.',
    'This article is published with permission from the author.',
    '© 2024 NY Times. All rights reserved. Terms of use apply.'
  ];

  return rightsStatements[Math.floor(Math.random() * rightsStatements.length)];
};

// Function to generate a random link and its clean URL
const generateLinkAndCleanUrl = () => {
  // Generate a random domain name
  const domain = faker.internet.domainName(); // e.g., 'slippery-waiting.com'

  // Create the link
  const link = `https://${domain}`;

  // Create the clean URL
  const cleanUrl = domain;

  return { link, cleanUrl };
};


async function createArticle(data) {
  const response = await fetch('http://localhost:1337/api/news-catchers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 3b33e4576f2915946a33f6c988a112c5590ac6dcb4cf01bb96abd4a538eccaae9cbd2fc466b25f4a47dd1eb98c780e4d73ad1c73f669ce168744a11e2e19f82bb383204ef3c927ae10186642856cf670383522e6d3dfc83fc77114ba6efebb2616a460f09060d2a3644ec6bfe0ce8f13d6e7d7b203a83387f9467e3968035385'
    },
    body: JSON.stringify({ data })
  });

  return response.json();
}

(async () => {
  const articles = [];

  for (let i = 0; i < 100; i++) {
    const { link, cleanUrl } = generateLinkAndCleanUrl();

    const article = {
      clean_url: cleanUrl,
      author: `${faker.person.firstName()} ${faker.person.lastName()}`,
      country: faker.location.country(),
      language: 'en',
      link,
      published_date: faker.date.recent().toISOString(),
      rank: faker.number.int({ min: 1, max: 1000 }),
      rights: generateRights(),
      summary: faker.word.words(10000),
      title: generateMeaningfulNewsTitle(),
      topic: randomTopic,
    };

    articles.push(createArticle(article));
  }

  // Insert all articles
  const results = await Promise.all(articles);
  console.log('Inserted 99 articles:', results);
})();

