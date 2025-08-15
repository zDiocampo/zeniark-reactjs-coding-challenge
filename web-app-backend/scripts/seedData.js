const mongoose = require('mongoose');
const Question = require('../models/Question');
require('dotenv').config();

// Function to decode HTML entities
function decodeHtmlEntities(text) {
  const entities = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&#039;': "'",
    '&rsquo;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&deg;': '°'
  };
  
  return text.replace(/&[^;]+;/g, (entity) => {
    return entities[entity] || entity;
  });
}

const questionsData = {
  "results": [
    {
      "category": "Animals",
      "type": "boolean",
      "difficulty": "easy",
      "question": "A slug's blood is green.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Entertainment: Film",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The movie \"The Nightmare before Christmas\" was all done with physical objects.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Geography",
      "type": "boolean",
      "difficulty": "easy",
      "question": "Greenland is almost as big as Africa.",
      "correct_answer": "False",
      "incorrect_answers": ["True"]
    },
    {
      "category": "Entertainment: Music",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The music video to The Buggle's \"Video Killed the Radio Star\" was the first music video to broadcast on MTV.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "General Knowledge",
      "type": "boolean",
      "difficulty": "easy",
      "question": "Gumbo is a stew that originated in Louisiana.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "easy",
      "question": "\"Undertale\" is an RPG created by Toby Fox and released in 2015.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The 2005 video game \"Call of Duty 2: Big Red One\" is not available on PC.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "History",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The United States of America declared their independence from the British Empire on July 4th, 1776.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "easy",
      "question": "Danganronpa 2: Goodbye Despair featured all of the surviving students from the first game.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Entertainment: Comics",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The \"Pepe\" meme originated from a comic drawn by Matt Furie called \"Boy's Club\"?",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Entertainment: Music",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The song \"Stronger Than You\" is a single by Estelle, who played Garnet in Steven Universe.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "easy",
      "question": "In Pokémon Sun and Moon, a male Salandit can evolve to a Salazzle.",
      "correct_answer": "False",
      "incorrect_answers": ["True"]
    },
    {
      "category": "Sports",
      "type": "boolean",
      "difficulty": "easy",
      "question": "In association football, every league has the same number of teams.",
      "correct_answer": "False",
      "incorrect_answers": ["True"]
    },
    {
      "category": "History",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The French Kingdom helped the United States gain their independence over Great Britain during the Revolutionary War.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Science & Nature",
      "type": "boolean",
      "difficulty": "easy",
      "question": "Water always boils at 100°C, 212°F, 373.15K, no matter where you are.",
      "correct_answer": "False",
      "incorrect_answers": ["True"]
    },
    {
      "category": "Entertainment: Music",
      "type": "boolean",
      "difficulty": "easy",
      "question": "The 2011 movie \"The Adventures of Tintin\" was directed by Steven Spielberg.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Science: Mathematics",
      "type": "boolean",
      "difficulty": "easy",
      "question": "An isosceles triangle has two sides of equal length as opposed to three.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Entertainment: Television",
      "type": "boolean",
      "difficulty": "easy",
      "question": "\"The Simpsons\" family is named after creator Matt Groening's real family.",
      "correct_answer": "True",
      "incorrect_answers": ["False"]
    },
    {
      "category": "Entertainment: Books",
      "type": "boolean",
      "difficulty": "easy",
      "question": "Shub-Niggurath is a creature that was created by J. R. R. Tolkien in his novel \"The Lord of The Rings\".",
      "correct_answer": "False",
      "incorrect_answers": ["True"]
    }
  ]
};

async function seedDatabase() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    // Add connection timeout and more options
    await mongoose.connect('mongodb://localhost:27017/zeniark_quiz', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });

    console.log('Connected to MongoDB successfully');

    // Clear existing data
    await Question.deleteMany({});
    console.log('Cleared existing questions');

    // Process and clean the questions data
    const cleanQuestions = questionsData.results.map(q => ({
      ...q,
      question: decodeHtmlEntities(q.question),
      correct_answer: decodeHtmlEntities(q.correct_answer),
      incorrect_answers: q.incorrect_answers.map(answer => decodeHtmlEntities(answer))
    }));

    // Insert new data
    const questions = await Question.insertMany(cleanQuestions);
    console.log(`Inserted ${questions.length} questions successfully`);

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
}

// Add process error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

seedDatabase();
