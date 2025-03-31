interface Quote {
  text: string;
  author?: string;
  category: "programming" | "motivation" | "literature" | "science" | "wisdom";
}

export const quotes: Quote[] = [
  // Programming Quotes
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "programming",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    category: "programming",
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
    category: "programming",
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: "Chris Pine",
    category: "programming",
  },

  // Motivational Quotes
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "motivation",
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: "motivation",
  },

  // Literature Quotes
  {
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    author: "Jane Austen",
    category: "literature",
  },
  {
    text: "Two roads diverged in a wood, and I took the one less traveled by, and that has made all the difference.",
    author: "Robert Frost",
    category: "literature",
  },

  // Science Quotes
  {
    text: "In every walk with nature one receives far more than he seeks.",
    author: "John Muir",
    category: "science",
  },
  {
    text: "The good thing about science is that it's true whether or not you believe in it.",
    author: "Neil deGrasse Tyson",
    category: "science",
  },

  // Wisdom Quotes
  {
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: "wisdom",
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    category: "wisdom",
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    category: "wisdom",
  },

  // Typing Practice Sentences
  {
    text: "The five boxing wizards jump quickly to test their reflexes and agility.",
    category: "literature",
  },
  {
    text: "Pack my box with five dozen liquor jugs, perfect for testing typing speed.",
    category: "literature",
  },
  {
    text: "How vexingly quick daft zebras jump when they see the bright morning sun.",
    category: "literature",
  },
  {
    text: "Sphinx of black quartz, judge my vow of perfection and speed in typing.",
    category: "literature",
  },
  {
    text: "The quick onyx goblin jumps over the lazy dwarf in the mystical garden.",
    category: "literature",
  },
];
