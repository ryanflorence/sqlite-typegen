// Irregular noun mappings
const IRREGULAR_NOUNS: Record<string, string> = {
  children: "child",
  people: "person",
  men: "man",
  women: "woman",
  teeth: "tooth",
  feet: "foot",
  mice: "mouse",
  geese: "goose",
  lives: "life",
  leaves: "leaf",
  knives: "knife",
  wolves: "wolf",
  shelves: "shelf",
  criteria: "criterion",
  phenomena: "phenomenon",
  fungi: "fungus",
  cacti: "cactus",
  syllabi: "syllabus",
  analyses: "analysis",
  diagnoses: "diagnosis",
  oases: "oasis",
  theses: "thesis",
  crises: "crisis",
  alumni: "alumnus",
  vertebrae: "vertebra",
};

// Words that are the same in singular and plural
const UNCHANGED_WORDS = new Set([
  "series",
  "species",
  "deer",
  "fish",
  "means",
  "offspring",
  "sheep",
  "moose",
  "rice",
  "information",
  "equipment",
  "news",
  "police",
]);

// Regular expression rules for singular/plural patterns
const RULES: [RegExp, string][] = [
  [/(quiz)zes$/i, "$1"],
  [/(matr)ices$/i, "$1ix"],
  [/(vert|ind)ices$/i, "$1ex"],
  [/^(ox)en/i, "$1"],
  [/(alias|status)es$/i, "$1"],
  [/(octop|vir)i$/i, "$1us"],
  [/(cris|ax|test)es$/i, "$1is"],
  [/(shoe)s$/i, "$1"],
  [/(o)es$/i, "$1"],
  [/(bus)es$/i, "$1"],
  [/([m|l])ice$/i, "$1ouse"],
  [/(x|ch|ss|sh)es$/i, "$1"],
  [/(m)ovies$/i, "$1ovie"],
  [/(s)eries$/i, "$1eries"],
  [/([^aeiouy]|qu)ies$/i, "$1y"],
  [/(tive)s$/i, "$1"],
  [/(hive)s$/i, "$1"],
  [/((?:^[aeiou].*)|(?:[^f]))(ve)s$/i, "$1$2"], // updated ves rule
  [/([lr])ves$/i, "$1f"],
  [/([^f])ves$/i, "$1fe"],
  [/(base)s$/i, "$1"], // Added specific rule for -base words
  [/(^analy)ses$/i, "$1sis"],
  [/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, "$1sis"],
  [/([ti])a$/i, "$1um"],
  [/(n)ews$/i, "$1ews"],
  [/(.*)es$/i, "$1e"], // Modified to preserve 'e' ending
  [/s$/i, ""],
];

/**
 * Converts a plural English word to its singular form.
 * Handles irregular nouns, unchanged words, and regular inflection patterns.
 *
 * @param word - The plural word to convert to singular
 * @returns The singular form of the word
 *
 * @example
 * singularize('categories') // returns 'category'
 * singularize('children') // returns 'child'
 * singularize('fish') // returns 'fish'
 */
export function singularize(word: string): string {
  // Handle empty strings or non-strings
  if (!word || typeof word !== "string") {
    return word;
  }

  // Convert to lowercase for comparison
  const lowerWord = word.toLowerCase();

  // Check for irregular nouns
  if (IRREGULAR_NOUNS[lowerWord]) {
    // Preserve original capitalization
    if (word[0] === word[0].toUpperCase()) {
      return (
        IRREGULAR_NOUNS[lowerWord].charAt(0).toUpperCase() +
        IRREGULAR_NOUNS[lowerWord].slice(1)
      );
    }
    return IRREGULAR_NOUNS[lowerWord];
  }

  // Check for unchanged words
  if (UNCHANGED_WORDS.has(lowerWord)) {
    return word;
  }

  // Apply regular expression rules
  for (const [pattern, replacement] of RULES) {
    if (pattern.test(word)) {
      return word.replace(pattern, replacement);
    }
  }

  // Return original word if no rules match
  return word;
}
