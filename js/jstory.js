var JSTORY = (function() {
    // jStory rules on ECMAScript 6!
    'use strict';
    // Module
    let jstoryModule = {};
    // variables
    /* The main array representing time passing,
     * also contains story information associated
     * with the year. */
    let yearsElapsed = [
        /* {
         *   year: "",
         *   events: [],
         * } */
    ];
    /* The array which represents the characters
     * in the story and their attributes and
     * personalities. */
    let characters = [
        /* {
         *   name: "",
         *   place: "",
         *   popularity: 0,
         *   quirks: [],
         *   opinions: [],
         *   // List of items, treasures...
         *   // probably steal from the Faterator
         *   has: [],
         * } */
    ];
    /* Will contain all the places in the world. */
    let places = [];
    // Functions
    /**
     * Returns a number that is random within range.
     * @param {Number} min
     * @param {Number} max
     * @returns A number in the range specified. Defaults
     * to 0 - 100.
     */
    let getRandomRange = function(min = 0, max = 100) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    /**
     * Returns a number that is less than highNum.
     * Will return 0 as a minimum.
     * @param {Number} highNum
     * @returns A number from 0 to highNum.
     */
    let randomNum = function(highNum) {
        return Math.floor(Math.random() * parseInt(highNum));
    };
    /**
     * Return ONE name that sounds fantasy-y.
     * @returns A fantasy sounding name.
     */
    let createFantasyName = function() {
        // Potential first syllables
        let firstSyl = [
            "Ab", "Ac", "Ak", "Ack", "Ay", "Az", "Aw",
            "Bo", "Bi", "By",
            "Fu", "Fo",
            "Ga",
            "Hi", "He",
            "Loo", "Lu", "Lo",
            "Mi", "Ma", "Mu",
            "Py", "Pi", "Paa", "Po",
            "Va", "Vi",
            "Xu",
            "Yi"
        ];
        // Potential second syllables
        // NOTE: Not used 100% of the time.
        let secondSyl = [
            "a",
            "b",
            "di", "da",
            "e",
            "hsh",
            "i",
            "ka", "ki", "ku",
            "lo", "li",
            "no", "ni", "na",
            "r", "ri",
            "ta", "to",
            "xi",
            "y", "ya", "ys",
            "z", "zi", "ze", "za"
        ];
        // Potential third syllables
        let thirdSyl = [
            "ae",
            "bon",
            "con",
            "don",
            "e",
            "ium",
            "k", "kin",
            "l", "lon", "lin",
            "m", "min", "mer",
            "n",
            "ope",
            "pic",
            "qon", "qin",
            "stic", "son",
            "t", "tt",
            "yon", "yin"
        ];
        // return three syllables - 75% chance
        if (randomNum(100) < 75) {
            return firstSyl[randomNum(firstSyl.length)] + secondSyl[randomNum(secondSyl.length)] + thirdSyl[randomNum(thirdSyl.length)];
        }
        // otherwise just return two
        return firstSyl[randomNum(firstSyl.length)] + thirdSyl[randomNum(thirdSyl.length)];
    };
    /**
     * Return a name and surname.
     * @returns Two fantasy names joined with a space.
     */
    let createFullName = function() {
        return createFantasyName() + " " + createFantasyName();
    };
    /**
     * Will place a character somewhere in the
     * world.
     */
    let createPlaces = function(character) {
        let placeTypes = [
            "Desert",
            "Temple",
            "District",
            "Continent",
            "City",
            "Town",
            "Village",
            "Forest",
            "Tiaga",
            "Hills",
            "Plains",
            "Savannah",
            "Plateau",
            "Canyon"
        ];
        let uniqueNames = [];
        let numberOfLocations = 30;
        // Generate our unique city names
        // by slightly altering createFantasyName();
        for (let i = 0; i < numberOfLocations; i++) {
            let chance = randomNum(100);
            let locationName = "";
            if (chance < 20) {
                locationName = createFantasyName() + "ia";
            } else if (chance < 50) {
                locationName = createFantasyName() + "ston";
            } else if (chance < 70) {
                locationName = createFantasyName() + "ter";
            } else {
                locationName = createFantasyName();
            }
            uniqueNames.push(locationName + " " + placeTypes[randomNum(placeTypes.length)]);
        }
        // Set the character's place
        places = uniqueNames;
    };
    /**
     * Will return a random place, after you run
     * createPlaces() to generate them.
     * @returns A string representing a place
     */
    let getRandomPlace = function() {
        return places[randomNum(places.length)];
    };
    /**
     * Builds the createCharacters array by
     * filling it with strings that represent
     * what will eventually be objects containing
     * personality traits, possessions, desires
     * friends, enemies, etc.
     */
    let createCharacters = function() {
        // This will probably scale with years passed
        // to make the story more "complex".
        let numberOfCharacters = getRandomRange(4, 16);
        for (let i = 0; i < numberOfCharacters; i++) {
            characters.push({
                name: createFullName(),
                place: getRandomPlace()
            });
        }
    };
    /**
     * Will return if character is alive or not.
     * Just returns true right now until I write
     * the aging stuff.
     * @param {Character} character
     * @returns character's alive status
     */
    let characterIsAlive = function(character) {
        return true;
    };
    /**
     * Will "pass the time" by building the
     * yearsElapsed array, filling it with strings
     * that represent years passing.
     * Will eventually add events instead of just
     * years.
     */
    let passTime = function() {
        // Start this low and make the stories dense
        // and intertwined so when we jack this number
        // up we get AWESOME STORIES.
        let timeToPass = getRandomRange(3, 5);
        // This will eventually be given to us by the
        // user I would think.
        let startingYear = getRandomRange(1, 2200);
        // A blank event list which we'll figure out and
        // append to the events for the year.
        let eventList = [];
        for (let i = startingYear; i < (startingYear + timeToPass); i++) {
            // Clear out our event list since it's a new year.
            eventList = [];
            // Pass the year for all the characters.
            for (let character in characters) {
                // Ensure we don't iterate over prototype members
                if (characters.hasOwnProperty(character)) {
                    // Only pass time if the character is alive
                    if (characterIsAlive(characters[character])) {
                        // Have some events happen, probably base this
                        // on how "popular" or "social" or "interactive"
                        // characters are
                        let numberOfEvents = getRandomRange(0, 5);
                        for (let j = 0; j < numberOfEvents; j++) {
                            eventList.push({
                                character: characters[character].name,
                                // What characters are in the same place?
                                interaction: "",
                                // place: migrateCharacter() eventually
                                place: characters[character].place,
                                // This will need some TLC, right now it's
                                // heads and tails. This should probably be
                                // full on sentences with consequences.
                                outcome: randomNum(100) < 50 ? "Good" : "Bad"
                            });
                        }
                    } else {
                        // Uh oh... goodbye, sweet prince(ss).
                        //killCharacter(characters[character]);
                    }
                }
            }
            // Push all of our data out to the variable
            // so we can access it in writeStory();
            yearsElapsed.push({
                year: i,
                events: eventList
            });
        }
    };
    /**
     * Writes the story we have already created out
     * to some HTML elements which will eventually
     * rely on some CSS style.
     */
    let writeStory = function() {
        for (var year in yearsElapsed) {
            // Ensure we aren't iterating over
            // prototype members of this object.
            if (yearsElapsed.hasOwnProperty(year)) {
                // Get the story element to fill up
                let storyElement = document.getElementsByClassName("story")[0];
                // Start assembling the HTML to fill it with.
                let storyHTML = "<div class='event'>" +
                    "<h2>" + yearsElapsed[year].year + "</h2>" +
                    "<ul>";
                let endStoryHTML = "</ul>" +
                    "</div>";
                // For readability, assign our current events
                // to a variable.
                let currentEvents = yearsElapsed[year].events;
                for (let event in currentEvents) {
                    // Make sure to not iterate over prototype members.
                    if (currentEvents.hasOwnProperty(event)) {
                        // Ensure we don't iterate over prototype members
                        if (currentEvents.hasOwnProperty(event)) {
                            // Reset storyHTML because we are in a new event.
                            storyHTML = "<div class='event'>" +
                                "<h2>" + yearsElapsed[year].year + "</h2>" +
                                "<ul>";
                            // Append our event information to our newly reset
                            // storyHTML.
                            storyHTML += "<li>Character: " + currentEvents[event].character + "</li>" +
                                "<li>Place: " + currentEvents[event].place + "</li>" +
                                "<li>Outcome: " + currentEvents[event].outcome + "</li>";
                        }
                        // Fill our <ul> with story events
                        // Fill the body with our HTML based on our story.
                        storyElement.innerHTML += storyHTML + endStoryHTML;
                    }
                }
            }
        }
    };
    /**
     * Creates an entirely new story.
     */
    let nextStory = function() {
        createPlaces();
        createCharacters();
        passTime();
        writeStory();
    };
    /**
     * Public facing .next() function, will
     * call the nextStory() function.
     */
    jstoryModule.next = function() {
        nextStory();
    };
    // Give back the module
    return jstoryModule;
})(); // Using an IIFE here for closure

// Create a story as soon as we have
// the DOMContentLoaded event fire off.
document.addEventListener("DOMContentLoaded", function() {
    JSTORY.next();
});