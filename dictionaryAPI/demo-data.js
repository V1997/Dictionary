// Demo dictionary data for testing without Oxford API
const demoWords = {
    "hello": {
        word: "hello",
        entries: [
            {
                partOfSpeech: "exclamation",
                definition: "Used as a greeting or to begin a phone conversation.",
                examples: ["Hello there!", "She picked up the phone and said hello."],
                pronunciation: "həˈloʊ"
            },
            {
                partOfSpeech: "noun",
                definition: "An utterance of 'hello'; a greeting.",
                examples: ["She gave me a cheerful hello."],
                pronunciation: "həˈloʊ"
            }
        ]
    },
    "world": {
        word: "world",
        entries: [
            {
                partOfSpeech: "noun",
                definition: "The earth, together with all of its countries and peoples.",
                examples: ["He traveled around the world.", "The world's population is growing."],
                pronunciation: "wərld"
            },
            {
                partOfSpeech: "noun",
                definition: "A particular region or group of countries.",
                examples: ["The Western world", "The developing world"],
                pronunciation: "wərld"
            }
        ]
    },
    "dictionary": {
        word: "dictionary",
        entries: [
            {
                partOfSpeech: "noun",
                definition: "A book or electronic resource that lists the words of a language typically in alphabetical order and gives their meaning.",
                examples: ["I looked up the word in the dictionary.", "An online dictionary"],
                pronunciation: "ˈdɪkʃəˌnɛri"
            }
        ]
    },
    "programming": {
        word: "programming",
        entries: [
            {
                partOfSpeech: "noun",
                definition: "The process or activity of writing computer programs.",
                examples: ["She learned programming in college.", "Programming languages like JavaScript"],
                pronunciation: "ˈproʊˌɡræmɪŋ"
            }
        ]
    },
    "javascript": {
        word: "javascript",
        entries: [
            {
                partOfSpeech: "noun",
                definition: "A programming language commonly used for web development.",
                examples: ["This website uses JavaScript for interactivity.", "Learning JavaScript fundamentals"],                pronunciation: "ˈdʒɑvəˌskrɪpt"
            }
        ]
    },
    "test": {
        word: "test",
        entries: [
            {
                partOfSpeech: "noun",
                definition: "A procedure intended to establish the quality, performance, or reliability of something.",
                examples: ["We need to run a test to check the system.", "The test results were positive."],
                pronunciation: "test"
            },
            {
                partOfSpeech: "verb",
                definition: "To take measures to check the quality, performance, or reliability of something.",
                examples: ["Let's test this new feature.", "She tested the water temperature."],
                pronunciation: "test"
            }
        ]
    },
    "search": {
        word: "search",
        entries: [
            {
                partOfSpeech: "verb",
                definition: "To try to find something by looking or otherwise seeking carefully and thoroughly.",
                examples: ["I searched for the missing keys.", "Search the database for relevant records."],
                pronunciation: "sɜːrtʃ"
            },
            {
                partOfSpeech: "noun",
                definition: "An act of searching for someone or something.",
                examples: ["The search took hours.", "A quick search revealed the answer."],
                pronunciation: "sɜːrtʃ"
            }
        ]
    },
    "example": {
        word: "example",
        entries: [
            {
                partOfSpeech: "noun",
                definition: "A thing characteristic of its kind or illustrating a general rule.",
                examples: ["This is a good example of modern art.", "For example, consider the following case."],
                pronunciation: "ɪɡˈzæmpəl"
            }
        ]
    }
};

module.exports = demoWords;
