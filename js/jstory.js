var JSTORY = (function() {
    // jStory runs on ECMAScript 6!
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
    // We need to keep track of how many people
    // are popular so we don't get a bloated story.
    let popularPeople = 0;
    // The threshold for a "popular" character, out
    // of 100.
    const popularThreshold = 80;
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
        const firstSyl = [
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
        const secondSyl = [
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
        const thirdSyl = [
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
        const placeTypes = [
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
        const numberOfLocations = 30;
        // Generate our unique city names
        // by slightly altering createFantasyName();
        for (let i = 0; i < numberOfLocations; i++) {
            const chance = randomNum(100);
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
        // Fill up the variable all the other
        // functions can see.
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
     * Will find the character's popularity based off of a
     * character name passed in related to an event. Takes
     * in a parameter for attributeName, which defines the
     * key of the object's value you'd like to retreive (ie;
     * "popularity" or "opinions[characterName]).
     * @param {String} A character name, usually from
     * an event.
     * @param {...String} Rest Attribute: attributeName
     * @returns A character or null
     */
    let findCharacterAttributeByName = function(characterName, ...attributeName) {
        for(let i = 0; i < characters.length; i++) {
            if(characters[i].name === characterName) {
                if(attributeName.length > 1) {
                    // We have an index and an array being passed in?
                    // No problem, we can handle that!
                    return characters[i][attributeName[0]][parseInt(attributeName[1])];
                }
                // Otherwise, let's just return the data that was asked for.
                return characters[i][attributeName];
            }
        }
        return null;
    };
    /**
     * Handles generating the character's popularity,
     * and also handles ensuring not too many popular
     * characters are generated.
     */
    let assignCharacterPopularity = function() {
        let popularity = randomNum(100);
        const popularLimit = 4;
        // If we have more popular people than we want,
        // but our generated popularity number is still higher
        // than the threshold...
        if(popularPeople > popularLimit && popularity > popularThreshold) {
            // Generate new popularity value with the threshold
            // as the maxima.
            popularity = randomNum(popularThreshold);
        }
        // If we have less popular people than we want, and this popularity
        // rating is higher than our threshold, we have to let the rest of this
        // program know about it by incrementing our popularPeople variable.
        else if(popularPeople <= popularLimit && popularity > popularThreshold) {
            popularPeople += 1;
        }
        return popularity;
    };
    /** 
     * Will create a characters.length size array
     * and fill it with -1 (for dislike), 0 (for
     * indifferent), and 1 (for like) where each
     * character is.
     * @param {Integer} characterIndex
     */
    let createOpinionMatrix = function(characterIndex) {
        let randomChance = getRandomRange();
        for (let i = 0; i < characters.length; i++) {
            // I'm counting on the characters array not changing
            // when this is called for createOpinions, so this below
            // statement is okay.
            if(i !== characterIndex) {
                if(randomChance < 33) {
                    characters[characterIndex].opinions[i] = -1;
                }
                else if(randomChance < 66) {
                    characters[characterIndex].opinions[i] = 0;
                }
                else {
                    characters[characterIndex].opinions[i] = 1;
                }
            }
            // The characters have an indifferent opinion of
            // themselves.
            else {
                    characters[characterIndex].opinions[i] = 0;
            }
        }
    };
    let createOpinions = function() {
        // This will probably scale with years passed
        // to make the story more "complex".
        const numberOfCharacters = characters.length;
        for (let i = 0; i < numberOfCharacters; i++) {
            createOpinionMatrix(i);
        }
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
        const numberOfCharacters = getRandomRange(4, 16);
        for (let i = 0; i < numberOfCharacters; i++) {
            characters.push({
                name: createFullName(),
                place: getRandomPlace(),
                popularity: assignCharacterPopularity(),
                opinions: []
            });
        }
        // Before we create all the opinions, all
        // the characters have to be created.
        createOpinions();
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
     * Will return a group of characters that
     * are at a certain place.
     * @param {String} Character's name who you are checking against.
     * @param {Place} The given place to look for characters
     * @returns List of characters or null.
     */
    let charactersAtPlace = function(characterName, place) {
        let charList = [];
        for (let character in characters) {
            if(characters.hasOwnProperty(character)) {
                // If the character is at the place and
                // it's not the character we are currently evaluating...
                if(characters[character].place === place && characters[character].name != characterName) {
                    charList.push(characters[character].name);
                }
            }
        }
        return charList.length === 0 ? null : charList;
    };
    /**
     * Will migrate a character to a new location.
     * @param {Character} The character who will move.
     * @returns true if the character moves, and false
     * if the character doesn't move.
     */
    let migrateCharacter = function(character) {
        /* For now let's just say if the character
         * "wants" to move for any reason (a 5-15% chance),
         * they should move. */
        if(getRandomRange() < getRandomRange(5,15)) {
            let destinationIndex = getRandomRange(0,places.length);
            let destination = places[destinationIndex];
            /* Ensure we have a unique desination to go to,
            * that is, we don't want the character going to
            * the same place they are at. */
            while(destination === character.place) {
                destinationIndex = getRandomRange(0,places.length);
                destination = places[destinationIndex];
            }
            // Now set the character's place to the new location
            character.place = destination;
        }
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
        const timeToPass = getRandomRange(3, 5);
        // This will eventually be given to us by the
        // user I would think.
        const startingYear = getRandomRange(1, 2200);
        // A blank event list which we'll figure out and
        // append to the events for the year.
        let eventList = [];
        for (let i = startingYear; i < (startingYear + timeToPass); i++) {
            // Clear out our event list since it's a new year.
            eventList = [];
            // Pass the year for all the characters.
            for (let character = 0; character < characters.length; character++) {
                // Ensure that our character is alive.
                if (characterIsAlive(characters[character])) {
                    // Have some events happen, probably base this
                    // on how "popular" or "social" or "interactive"
                    // characters are
                    const numberOfEvents = getRandomRange(0, 5);
                    for (let j = 0; j < numberOfEvents; j++) {
                        eventList.push({
                            character: characters[character].name,
                            // What characters are in the same place?
                            interaction: charactersAtPlace(characters[character].name, characters[character].place),
                            place: characters[character].place,
                            // This will need some TLC, right now it's
                            // heads and tails. This should probably be
                            // full on sentences with consequences.
                            outcome: randomNum(100) < 50 ? "good" : "bad"
                        });
                    }
                    // Now let's make sure the character can
                    // move if they want to.
                    migrateCharacter(characters[character]);
                } else if (characters.hasOwnProperty(character) && !characterIsAlive(characters[character])) {
                    // Uh oh... goodbye, sweet prince(ss).
                    //killCharacter(characters[character]);
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
        let randomChance = randomNum(characters.length);
        let randomCharacterName = "";
        for (let year = 0; year < yearsElapsed.length; year++) {
            // Get the story element to fill up
            const storyElement = document.getElementsByClassName("story")[0];
            // Start assembling the HTML to fill it with.
            let storyHTML = "<div class='event'>" +
                "<h2>" + yearsElapsed[year].year + "</h2>" +
                "<ul>";
            const endStoryHTML = "</ul>" +
                "</div>";
            // For readability, assign our current events
            // to a variable.
            let currentEvents = yearsElapsed[year].events;
            // Ensure we don't iterate over prototype members
            for (let i = 0; i < currentEvents.length; i++) {
                // Let's show the story IF the character is popular enough.
                // Another way to say this: "Only display the character's story
                // if they are popular enough to beat the RNG with their popularity
                // rating.'"
                // How will we see less popular characters than 40? Easy - the other
                // characters will interact with them and we'll see them there, in
                // the background.
                //if(findCharacterAttributeByName(currentEvents[i].character, "popularity") > getRandomRange(40, 100)) {    
                    // Reset storyHTML because we are in a new event.
                    storyHTML = "<div class='event'>" +
                        "<h2>" + currentEvents[i].place + ", year " + yearsElapsed[year].year + "</h2>";
                    // Append our event information to our newly reset
                    // storyHTML.
                    storyHTML += "<p>" + currentEvents[i].character + " had a " +
                        currentEvents[i].outcome + " experience/interaction.</p>";
                    // Handle any interactions we had in the location.
                    if(currentEvents[i].interaction !== null) {
                        storyHTML += "<p>Interactions:<ul>";
                        for(let j = 0; j < currentEvents[i].interaction.length; j++) {
                            storyHTML += "<li>Interaction with: " + currentEvents[i].interaction[j] + "</li>";
                        }
                        storyHTML += "</ul></p>";
                    }
                    storyHTML += "<p>" + currentEvents[i].character + "'s Popularity: " + findCharacterAttributeByName(currentEvents[i].character, "popularity") + "</p>";
                    // Reset our random character index and name
                    // for generating random opinions.
                    randomChance = randomNum(characters.length);
                    randomCharacterName = characters[randomChance].name;
                    storyHTML += "<p>" + currentEvents[i].character + "'s Opinion of " + randomCharacterName + ": " + findCharacterAttributeByName(currentEvents[i].character, "opinions", randomChance) + "</p>";
                    // Fill our <ul> with story events
                    // Fill the body with our HTML based on our story.
                    storyElement.innerHTML += storyHTML + endStoryHTML;
                //}
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