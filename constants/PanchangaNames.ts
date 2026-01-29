
import { Language } from './Strings';

// 0-14: Shukla Paksha (Pratipada to Purnima)
// 15-29: Krishna Paksha (Pratipada to Amavasya)
export const TITHIS: { [key in Language]: string[] } = {
    en: [
        "Shukla Pratipada", "Shukla Dwitiya", "Shukla Tritiya", "Shukla Chaturthi", "Shukla Panchami",
        "Shukla Shashthi", "Shukla Saptami", "Shukla Ashtami", "Shukla Navami", "Shukla Dashami",
        "Shukla Ekadashi", "Shukla Dwadashi", "Shukla Trayodashi", "Shukla Chaturdashi", "Purnima",
        "Krishna Pratipada", "Krishna Dwitiya", "Krishna Tritiya", "Krishna Chaturthi", "Krishna Panchami",
        "Krishna Shashthi", "Krishna Saptami", "Krishna Ashtami", "Krishna Navami", "Krishna Dashami",
        "Krishna Ekadashi", "Krishna Dwadashi", "Krishna Trayodashi", "Krishna Chaturdashi", "Amavasya"
    ],
    kn: [
        "ಶುಕ್ಲ ಪ್ರತಿಪದ", "ಶುಕ್ಲ ದ್ವಿತೀಯ", "ಶುಕ್ಲ ತೃತೀಯ", "ಶುಕ್ಲ ಚತುರ್ಥಿ", "ಶುಕ್ಲ ಪಂಚಮಿ",
        "ಶುಕ್ಲ ಷಷ್ಠಿ", "ಶುಕ್ಲ ಸಪ್ತಮಿ", "ಶುಕ್ಲ ಅಷ್ಟಮಿ", "ಶುಕ್ಲ ನವಮಿ", "ಶುಕ್ಲ ದಶಮಿ",
        "ಶುಕ್ಲ ಏಕಾದಶಿ", "ಶುಕ್ಲ ದ್ವಾದಶಿ", "ಶುಕ್ಲ ತ್ರಯೋದಶಿ", "ಶುಕ್ಲ ಚತುರ್ದಶಿ", "ಹುಣ್ಣಿಮೆ",
        "ಕೃಷ್ಣ ಪ್ರತಿಪದ", "ಕೃಷ್ಣ ದ್ವಿತೀಯ", "ಕೃಷ್ಣ ತೃತೀಯ", "ಕೃಷ್ಣ ಚತುರ್ಥಿ", "ಕೃಷ್ಣ ಪಂಚಮಿ",
        "ಕೃಷ್ಣ ಷಷ್ಠಿ", "ಕೃಷ್ಣ ಸಪ್ತಮಿ", "ಕೃಷ್ಣ ಅಷ್ಟಮಿ", "ಕೃಷ್ಣ ನವಮಿ", "ಕೃಷ್ಣ ದಶಮಿ",
        "ಕೃಷ್ಣ ಏಕಾದಶಿ", "ಕೃಷ್ಣ ದ್ವಾದಶಿ", "ಕೃಷ್ಣ ತ್ರಯೋದಶಿ", "ಕೃಷ್ಣ ಚತುರ್ದಶಿ", "ಅಮಾವಾಸ್ಯೆ"
    ],
    sa: [
        "शुक्ल प्रतिपदा", "शुक्ल द्वितीया", "शुक्ल तृतीया", "शुक्ल चतुर्थी", "शुक्ल पञ्चमी",
        "शुक्ल षष्ठी", "शुक्ल सप्तमी", "शुक्ल अष्टमी", "शुक्ल नवमी", "शुक्ल दशमी",
        "शुक्ल एकादशी", "शुक्ल द्वादशी", "शुक्ल त्रयोदशी", "शुक्ल चतुर्दशी", "पूर्णिमा",
        "कृष्ण प्रतिपदा", "कृष्ण द्वितीया", "कृष्ण तृतीया", "कृष्ण चतुर्थी", "कृष्ण पञ्चमी",
        "कृष्ण षष्ठी", "कृष्ण सप्तमी", "कृष्ण अष्टमी", "कृष्ण नवमी", "कृष्ण दशमी",
        "कृष्ण एकादशी", "कृष्ण द्वादशी", "कृष्ण त्रयोदशी", "कृष्ण चतुर्दशी", "अमावास्या"
    ]
};

export const NAKSHATRAS: { [key in Language]: string[] } = {
    en: [
        "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
        "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
        "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishtha", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
    ],
    kn: [
        "ಅಶ್ವಿನಿ", "ಭರಣಿ", "ಕೃತ್ತಿಕಾ", "ರೋಹಿಣಿ", "ಮೃಗಶಿರ", "ಆರ್ದ್ರಾ", "ಪುನರ್ವಸು", "ಪುಷ್ಯ", "ಆಶ್ಲೇಷ",
        "ಮಘಾ", "ಪೂರ್ವ ಫಲ್ಗುಣಿ", "ಉತ್ತರ ಫಲ್ಗುಣಿ", "ಹಸ್ತ", "ಚಿತ್ತಾ", "ಸ್ವಾತಿ", "ವಿಶಾಖ", "ಅನುರಾಧ", "ಜ್ಯೇಷ್ಠ",
        "ಮೂಲ", "ಪೂರ್ವ ಆಷಾಢ", "ಉತ್ತರ ಆಷಾಢ", "ಶ್ರವಣ", "ಧನಿಷ್ಠ", "ಶತಭಿಷ", "ಪೂರ್ವ ಭಾದ್ರಪದ", "ಉತ್ತರ ಭಾದ್ರಪದ", "ರೇವತಿ"
    ],
    sa: [
        "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशिरा", "आर्द्रा", "पुनर्वसु", "पुष्य", "आश्लेषा",
        "मघा", "पूर्व फल्गुनी", "उत्तर फल्गुनी", "हस्त", "चित्रा", "स्वाति", "विशाखा", "अनुराधा", "ज्येष्ठा",
        "मूल", "पूर्वाषाढा", "उत्तराषाढा", "श्रवण", "धनिष्ठा", "शतभिषा", "पूर्व भाद्रपद", "उत्तर भाद्रपद", "रेवती"
    ]
};

export const YOGAS: { [key in Language]: string[] } = {
    en: [
        "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula",
        "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan",
        "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"
    ],
    kn: [
        "ವಿಷ್ಕಂಭ", "ಪ್ರೀತಿ", "ಆಯುಷ್ಮಾನ್", "ಸೌಭಾಗ್ಯ", "ಶೋಭನ", "ಅತಿಗಂಡ", "ಸುಕರ್ಮ", "ಧೃತಿ", "ಶೂಲ",
        "ಗಂಡ", "ವೃದ್ಧಿ", "ಧ್ರುವ", "ವ್ಯಾಘಾತ", "ಹರ್ಷಣ", "ವಜ್ರ", "ಸಿದ್ಧಿ", "ವ್ಯತಿಪಾತ", "ವರೀಯಾನ್",
        "ಪರಿಘ", "ಶಿವ", "ಸಿದ್ಧ", "ಸಾಧ್ಯ", "ಶುಭ", "ಶುಕ್ಲ", "ಬ್ರಹ್ಮ", "ಇಂದ್ರ", "ವೈಧೃತಿ"
    ],
    sa: [
        "विष्कम्भ", "प्रीति", "आयुष्मान", "सौभाग्य", "शोभन", "अतिगण्ड", "सुकर्मा", "धृति", "शूल",
        "गण्ड", "वृद्धि", "ध्रुव", "व्याघात", "हर्षण", "वज्र", "सिद्धि", "व्यतीपात", "वरीयान्",
        "परिघ", "शिव", "सिद्ध", "साध्य", "शुभ", "शुक्ल", "ब्रह्म", "इन्द्र", "वैधृति"
    ]
};

export const KARANAS: { [key in Language]: string[] } = {
    en: [
        "Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti (Bhadra)", // Movable (Chara)
        "Shakuni", "Chatushpada", "Naga", "Kimstughna" // Fixed (Sthira)
    ],
    kn: [
        "ಬವ", "ಬಾಲವ", "ಕೌಲವ", "ತೈತಲೆ", "ಗರ", "ವಣಿಜ", "ವಿಷ್ಟಿ (ಭದ್ರಾ)",
        "ಶಕುನಿ", "ಚತುಷ್ಪಾದ", "ನಾಗ", "ಕಿಂಸ್ತುಘ್ನ"
    ],
    sa: [
        "बव", "बालव", "कौलव", "तैतिल", "गर", "वणिज", "विष्टि (भद्रा)",
        "शकुनि", "चतुष्पाद", "नाग", "किंस्तुघ्न"
    ]
};

export const RITUS: { [key in Language]: string[] } = {
    en: ["Vasanta", "Grishma", "Varsha", "Sharad", "Hemanta", "Shishira"],
    kn: ["ವಸಂತ", "ಗ್ರೀಷ್ಮ", "ವರ್ಷ", "ಶರದ", "ಹೇಮಂತ", "ಶಿಶಿರ"],
    sa: ["वसन्त", "ग्रीष्म", "वर्षा", "शरद्", "हेमन्त", "शिशिर"]
};

export const AYANAS: { [key in Language]: string[] } = {
    en: ["Uttarayana", "Dakshinayana"],
    kn: ["ಉತ್ತರಾಯಣ", "ದಕ್ಷಿಣಾಯಣ"],
    sa: ["उत्तरायण", "दक्षिणायन"]
};

export const SAMVATSARAS: { [key in Language]: string[] } = {
    en: [
        "Prabhava", "Vibhava", "Shukla", "Pramoda", "Prajotpatti", "Angirasa", "Srimukha", "Bhava", "Yuva", "Dhatru",
        "Ishwara", "Bahudhanya", "Pramathi", "Vikrama", "Vishu", "Chitrabhanu", "Subhanu", "Tarana", "Parthiva", "Vyaya",
        "Sarvajit", "Sarvadhari", "Virodhi", "Vikruti", "Khara", "Nandana", "Vijaya", "Jaya", "Manmatha", "Durmukhi",
        "Hevilambi", "Vilambi", "Vikari", "Sharvari", "Plava", "Shubhakrut", "Shobhakrut", "Krodhi", "Vishwavasu", "Parabhava",
        "Plavanga", "Kilaka", "Saumya", "Sadharana", "Virodhikrut", "Paridhavi", "Pramadicha", "Ananda", "Rakshasa", "Nala",
        "Pingala", "Kalayukti", "Siddharti", "Raudra", "Durmati", "Dundubhi", "Rudhirodgari", "Raktakshi", "Krodhana", "Akshaya"
    ],
    kn: [
        "ಪ್ರಭವ", "ವಿಭವ", "ಶುಕ್ಲ", "ಪ್ರಮೋದ", "ಪ್ರಜೋತ್ಪತ್ತಿ", "ಅಂಗೀರಸ", "ಶ್ರೀಮುಖ", "ಬೃವ", "ಯುವ", "ಧಾತೃ",
        "ಈಶ್ವರ", "ಬಹುಧಾನ್ಯ", "ಪ್ರಮಾಥಿ", "ವಿಕ್ರಮ", "ವಿಷು", "ಚಿತ್ರಭಾನು", "ಸ್ವಭಾನು", "ತಾರಣ", "ಪಾರ್ಥಿವ", "ವ್ಯಯ",
        "ಸರ್ವಜಿತ್", "ಸರ್ವಧಾರಿ", "ವಿರೋಧಿ", "ವಿಕೃತಿ", "ಖರ", "ನಂದನ", "ವಿಜಯ", "ಜಯ", "ಮನ್ಮಥ", "ದುರ್ಮುಖಿ",
        "ಹೇವಿಳಂಬಿ", "ವಿಳಂಬಿ", "ವಿಕಾರಿ", "ಶಾರ್ವರಿ", "ಪ್ಲವ", "ಶುಭಕೃತ್", "ಶೋಭಕೃತ್", "ಕ್ರೋಧಿ", "ವಿಶ್ವಾವಸು", "ಪರಾಭವ",
        "ಪ್ಲವಂಗ", "ಕೀಲಕ", "ಸೌಮ್ಯ", "ಸಾಧಾರಣ", "ವಿರೋಧಿಕೃತ್", "ಪರಿಧಾವಿ", "ಪ್ರಮಾದೀಚ", "ಆನಂದ", "ರಾಕ್ಷಸ", "ನಳ",
        "ಪಿಂಗಳ", "ಕಾಳಯುಕ್ತಿ", "ಸಿದ್ಧಾರ್ಥಿ", "ರೌದ್ರ", "ದುರ್ಮತಿ", "ದುಂದುಭಿ", "ರುಧಿರೋದ್ಗಾರಿ", "ರಕ್ತಾಕ್ಷಿ", "ಕ್ರೋಧನ", "ಅಕ್ಷಯ"
    ],
    sa: [
        "प्रभव", "विभव", "शुक्ल", "प्रमोद", "प्रजोत्पत्ति", "अङ्गिरस", "श्रीमुख", "भाव", "युव", "धात्री",
        "ईश्वर", "बहुधान्य", "प्रमाथी", "विक्रम", "वृष", "चित्रभानु", "सुभानु", "तारण", "पार्थिव", "व्यय",
        "सर्वजित्", "सर्वधारी", "विरोधी", "विकृति", "खर", "नन्दन", "विजय", "जय", "मन्मथ", "दुर्मुखी",
        "हेविलम्बी", "विलम्बी", "विकारी", "शर्वरी", "प्लव", "शुभकृत्", "शोभकृत्", "क्रोधी", "विश्वावसु", "पराभव",
        "प्लवङ्ग", "कीलक", "सौम्य", "साधारण", "विरोधकृत्", "परिधावी", "प्रमादी", "आनन्द", "राक्षस", "नल",
        "पिङ्गल", "कालयुक्ति", "सिद्धार्थी", "रौद्र", "दुर्मति", "दुन्दुभी", "रुधिरोद्गारी", "रक्ताक्षी", "क्रोधन", "अक्षय"
    ]
};
