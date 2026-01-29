// Indices for 8-part division of the day (Sunrise to Sunset)
// Day (Din) is divided into 8 equal parts (muhurtas).
// The indices below represent which part (1-8) corresponds to the period.
// Array index 0 = Sunday, 1 = Monday, ..., 6 = Saturday

// Values are 1-based (1st part, 2nd part, ..., 8th part)
export const RAHU_KALAM_INDEX = [8, 2, 7, 5, 6, 4, 3];
export const YAMAGANDA_INDEX = [5, 4, 3, 2, 1, 7, 6];
export const GULIKA_KALAM_INDEX = [7, 6, 5, 4, 3, 2, 1];

export const PERIOD_NAMES = {
    RAHU: { en: "Rahu Kalam", kn: "ರಾಹುಕಾಲ", sa: "राहुकाल" },
    YAMA: { en: "Yamaganda", kn: "ಯಮಗಂಡ", sa: "यमगण्ड" },
    GULIKA: { en: "Gulika Kalam", kn: "ಗುಳಿಕ ಕಾಲ", sa: "गुलिक काल" }
};
