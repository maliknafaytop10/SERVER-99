/* ==========================================
   NAFAY SERVERS — COMPLETE QUESTION DATABASES
   ========================================== */

const CHOOSE_YOUR_QUESTIONS = [
    { question: "Aapko Sunday ko kya karna pasand hai?", options: ["Game", "Study", "Activities", "Sleep"], correctIndex: 0 },
    { question: "Free time mein kya karna pasand hai?", options: ["Gaming", "Social Media", "Movies", "Music"], correctIndex: 0 },
    { question: "Aapka favourite time of day?", options: ["Morning", "Afternoon", "Evening", "Night"], correctIndex: 3 },
    { question: "Aapko kaunsa weather pasand hai?", options: ["Sunny", "Rainy", "Cold", "Cloudy"], correctIndex: 2 },
    { question: "Holiday par kya karna pasand hai?", options: ["Ghar mein rehna", "Travel", "Gaming", "Friends ke saath"], correctIndex: 1 },
    { question: "Aapko kaunsi game pasand hai?", options: ["Shooting", "Racing", "Sports", "Puzzle"], correctIndex: 0 },
    { question: "Aapko kya zyada pasand hai?", options: ["Fast Food", "Pizza", "BBQ", "Desi Food"], correctIndex: 1 },
    { question: "Drink mein kya choose karoge?", options: ["Cold Drink", "Juice", "Tea", "Milk"], correctIndex: 0 },
    { question: "Aapko kaunsi movie type pasand hai?", options: ["Comedy", "Horror", "Action", "Romance"], correctIndex: 2 },
    { question: "Aapko kaunsa colour pasand hai?", options: ["Red", "Blue", "Green", "Purple"], correctIndex: 1 }
];

const ANIMALS_QUESTIONS = [
    { question: "Duniya ka sabse bada land animal konsa hai?", options: ["Giraffe", "Elephant", "Lion", "Horse"], correctIndex: 1 },
    { question: "Sabse tez daurne wala land animal konsa hai?", options: ["Cheetah", "Tiger", "Horse", "Deer"], correctIndex: 0 },
    { question: "Kaunsa animal apni black-and-white stripes ke liye famous hai?", options: ["Panda", "Tiger", "Zebra", "Horse"], correctIndex: 2 },
    { question: "Kaunsa bird fly nahi kar sakta?", options: ["Eagle", "Parrot", "Sparrow", "Penguin"], correctIndex: 3 },
    { question: "Giraffe ki sabse khaas physical feature kya hai?", options: ["Long neck", "Big wings", "Sharp horns", "Short legs"], correctIndex: 0 },
    { question: "Honey banane wala insect konsa hai?", options: ["Ant", "Bee", "Fly", "Mosquito"], correctIndex: 1 },
    { question: "Panda aam tor par kya khata hai?", options: ["Meat", "Fish", "Bamboo", "Eggs"], correctIndex: 2 },
    { question: "“Ship of the Desert” kis animal ko kaha jata hai?", options: ["Horse", "Camel", "Donkey", "Cow"], correctIndex: 1 },
    { question: "Octopus ke kitne arms hote hain?", options: ["6", "10", "8", "4"], correctIndex: 2 },
    { question: "Kaunsa animal apni trunk ke liye famous hai?", options: ["Elephant", "Rhino", "Hippo", "Bear"], correctIndex: 0 }
];

const CARS_QUESTIONS = [
    { question: "BMW kis country ki automobile company hai?", options: ["Japan", "Germany", "Italy", "USA"], correctIndex: 1 },
    { question: "Toyota kis country ki company hai?", options: ["Germany", "France", "Japan", "Italy"], correctIndex: 2 },
    { question: "Ferrari ka famous logo kis animal ko show karta hai?", options: ["Horse", "Lion", "Eagle", "Tiger"], correctIndex: 0 },
    { question: "Tesla kis type ki cars ke liye famous hai?", options: ["Steam Cars", "Electric Cars", "Diesel Cars", "Tractors"], correctIndex: 1 },
    { question: "Lamborghini kis country ki company hai?", options: ["Germany", "USA", "Italy", "Japan"], correctIndex: 2 },
    { question: "Honda kis country ki company hai?", options: ["Japan", "Germany", "Canada", "France"], correctIndex: 0 },
    { question: "Mustang kis company ka famous car model hai?", options: ["BMW", "Ford", "Honda", "Toyota"], correctIndex: 1 },
    { question: "Mercedes-Benz ka famous logo kya hai?", options: ["Four Rings", "Horse", "Three-Pointed Star", "Crown"], correctIndex: 2 },
    { question: "Civic kis company ka famous model hai?", options: ["Honda", "BMW", "Ford", "Audi"], correctIndex: 0 },
    { question: "Porsche kis country ki automobile company hai?", options: ["Italy", "Germany", "Japan", "Spain"], correctIndex: 1 }
];

const INTERNET_QUESTIONS = [
    { question: "Google kis cheez ke liye sabse zyada famous hai?", options: ["Search Engine", "Car Company", "Food Delivery", "Clothing"], correctIndex: 0 },
    { question: "YouTube kis type ka platform hai?", options: ["Online Bank", "Video Sharing Platform", "Car Website", "Weather Service"], correctIndex: 1 },
    { question: "Instagram kis company ki ownership mein hai?", options: ["Microsoft", "Apple", "Meta", "Amazon"], correctIndex: 2 },
    { question: "WhatsApp kis company ki ownership mein hai?", options: ["Google", "Microsoft", "Amazon", "Meta"], correctIndex: 3 },
    { question: "WWW ka full form kya hai?", options: ["World Wide Web", "World Web Window", "Wide World Website", "Web World Wide"], correctIndex: 0 },
    { question: "Chrome kis company ka browser hai?", options: ["Apple", "Google", "Amazon", "Meta"], correctIndex: 1 },
    { question: "Wikipedia kis cheez ke liye famous hai?", options: ["Online Encyclopedia", "Online Shopping", "Gaming", "Video Editing"], correctIndex: 0 },
    { question: "Email address mein commonly konsa symbol hota hai?", options: ["#", "$", "@", "%"], correctIndex: 2 },
    { question: "YouTube ko Google ne kis saal acquire kiya tha?", options: ["2004", "2005", "2006", "2010"], correctIndex: 2 },
    { question: "Facebook ka parent company name kya hai?", options: ["Meta", "Alphabet", "Amazon", "Microsoft"], correctIndex: 0 }
];

const ISLAM_QUESTIONS = [
    { question: "Islam ki holy book ka naam kya hai?", options: ["Bible", "Quran", "Torah", "Psalms"], correctIndex: 1 },
    { question: "Muslims din mein kitni farz namazain parhte hain?", options: ["3", "4", "5", "6"], correctIndex: 2 },
    { question: "Islam ke aakhri Nabi ka naam kya hai?", options: ["Prophet Musa ﷺ", "Prophet Isa ﷺ", "Prophet Ibrahim ﷺ", "Prophet Muhammad ﷺ"], correctIndex: 3 },
    { question: "Kaaba kis city mein hai?", options: ["Makkah", "Madinah", "Riyadh", "Jeddah"], correctIndex: 0 },
    { question: "Ramadan mein Muslims kya rakhte hain?", options: ["Hajj", "Roza", "Zakat", "Nikah"], correctIndex: 1 },
    { question: "Islam ke five pillars mein se ek kya hai?", options: ["Shahadah", "Cricket", "Trade", "Travel"], correctIndex: 0 },
    { question: "Hajj kis Islamic month mein hota hai?", options: ["Ramadan", "Muharram", "Dhul-Hijjah", "Shawwal"], correctIndex: 2 },
    { question: "Eid-ul-Fitr kis month ke start mein hoti hai?", options: ["Ramadan", "Muharram", "Dhul-Hijjah", "Shawwal"], correctIndex: 3 },
    { question: "Muslims namaz mein kis direction ki taraf rukh karte hain?", options: ["Kaaba", "Mount Everest", "Madinah Station", "Jerusalem only"], correctIndex: 0 },
    { question: "Zakat Islam ke kya hai?", options: ["Pillars mein se ek", "Sport", "Festival only", "Language"], correctIndex: 0 }
];

const SPINNER_OPTIONS_DATA = [
    "Doctor", "Engineer", "Pilot", "Gamer", "Businessman", "Youtuber", "Developer", "Champion"
];
