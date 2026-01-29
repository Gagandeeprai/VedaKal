// @ts-ignore
const Astronomy = require('astronomy-engine');
import { GULIKA_KALAM_INDEX, RAHU_KALAM_INDEX, YAMAGANDA_INDEX } from '../constants/InauspiciousTimes';
import { AYANAS, KARANAS, NAKSHATRAS, RITUS, SAMVATSARAS, TITHIS, YOGAS } from '../constants/PanchangaNames';
import { Language } from '../constants/Strings';

export interface PanchangaData {
    tithi: string;
    tithiEndTime?: string;
    nakshatra: string;
    nakshatraEndTime?: string;
    vara: string;
    yoga: string;
    karana: string;
    samvatsara: string;
    ritu: string;
    ayana: string;
    sunrise: string;
    sunset: string;
    rahuKalam: string;
    yamaganda: string;
    gulikaKalam: string;
}

const WEEKDAYS = [
    { en: "Sunday", kn: "ಭಾನುವಾರ", sa: "भानुवासरः" },
    { en: "Monday", kn: "ಸೋಮವಾರ", sa: "सोमवासरः" },
    { en: "Tuesday", kn: "ಮಂಗಳವಾರ", sa: "मङ्गलवासरः" },
    { en: "Wednesday", kn: "ಬುಧವಾರ", sa: "बुधवासरः" },
    { en: "Thursday", kn: "ಗುರುವಾರ", sa: "गुरुवासरः" },
    { en: "Friday", kn: "ಶುಕ್ರವಾರ", sa: "शुक्रवासरः" },
    { en: "Saturday", kn: "ಶನಿವಾರ", sa: "शनिवासरः" },
];

// Approximate Lahiri Ayanamsa for 2025-2030
const AYANAMSA = 24.1;

export const getPanchanga = (date: Date, lat: number, lng: number, lang: Language): PanchangaData => {

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error("Invalid Date passed to getPanchanga:", date);
        throw new Error("Invalid Date passed to getPanchanga");
    }

    try {
        const formatTime = (d: Date) => {
            return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        };

        const normalize = (deg: number) => {
            let d = deg % 360;
            if (d < 0) d += 360;
            return d;
        };

        // --- CUSTOM BINARY SEARCH HELPERS ---
        // Robust replacement for Astronomy.Search to avoid type issues.

        // 1. Get Tithi Progress (0-360 deg)
        const getTithiLon = (d: Date) => {
            const s = Astronomy.SunPosition(d).elon;
            const mResult = Astronomy.EclipticGeoMoon(d);
            const m = (mResult as any).elon || (mResult as any).lon || 0;
            const sNag = normalize(s - AYANAMSA);
            const mNag = normalize(m - AYANAMSA);
            return normalize(mNag - sNag);
        };

        // 2. Get Nakshatra Progress (0-360 deg)
        const getNakLon = (d: Date) => {
            const mResult = Astronomy.EclipticGeoMoon(d);
            const m = (mResult as any).elon || (mResult as any).lon || 0;
            return normalize(m - AYANAMSA);
        };

        // Binary Search implementation
        // Finds time when valueFn crosses target within [start, start+24h]
        const findCrossing = (start: Date, valueFn: (d: Date) => number, target: number) => {
            // Check start value
            const startVal = valueFn(start);

            // Check end value (approx 24h later)
            const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
            const endVal = valueFn(end);

            // Logic: Value increases monotonic (mostly). 
            // If target is between startVal and endVal (handling 360 wrap), we search.

            // Handle Wrap: e.g. Start=355, End=10. Target=0 (or 360).
            let sV = startVal;
            let eV = endVal;
            let tV = target;

            // Unwind wrap for simple comparison if needed
            if (eV < sV) eV += 360; // 10 -> 370
            if (tV < sV) tV += 360; // 0 -> 360

            // Now we expect sV < tV < eV if crossing happens
            if (tV < sV || tV > eV) {
                // No crossing in next 24h (unlikely for Tithi/Nak, but possible)
                return null;
            }

            // Binary Search
            let low = start.getTime();
            let high = end.getTime();
            let mid = 0;

            // 20 iterations ~ 24h / 2^20 ~ 0.08 seconds precision. Excellent.
            for (let i = 0; i < 20; i++) {
                mid = (low + high) / 2;
                const d = new Date(mid);
                let val = valueFn(d);

                // Align val to our un-wrapped coords
                if (val < startVal) val += 360;

                if (val < tV) {
                    low = mid;
                } else {
                    high = mid;
                }
            }

            return new Date(high); // Return the time calculated
        };


        // 1. VARA
        const dayIndex = date.getDay();
        const currentVara = WEEKDAYS[dayIndex][lang];

        // 2. ASTRONOMICAL CALCULATIONS
        const observer = new Astronomy.Observer(lat, lng, 0);

        // Start search from MIDNIGHT
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const startTimeResult = new Astronomy.AstroTime(startOfDay);

        // SearchRiseSet
        let sunriseResult = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, startTimeResult, 1);
        let sunsetResult = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, startTimeResult, 1);

        if (sunriseResult && sunriseResult.time) sunriseResult = sunriseResult.time;
        if (sunsetResult && sunsetResult.time) sunsetResult = sunsetResult.time;

        const calcTime = sunriseResult ? sunriseResult : startTimeResult;
        // Make sure we have a native date for our custom calcs
        const calcDate = new Date(calcTime.date.getTime());

        // 3. CORE POSITIONS
        const sunResult = Astronomy.SunPosition(calcTime);
        const sunLong = sunResult.elon;

        const moonResult = Astronomy.EclipticGeoMoon(calcTime);
        const moonLong = (moonResult as any).elon || (moonResult as any).lon || 0;

        const sunLongNag = normalize(sunLong - AYANAMSA);
        const moonLongNag = normalize(moonLong - AYANAMSA);

        // 4. PANCHANGA ELEMENTS
        let longDiff = normalize(moonLongNag - sunLongNag);
        const tithiIndex = Math.floor(longDiff / 12);
        const currentTithi = (TITHIS && TITHIS[lang]) ? TITHIS[lang][tithiIndex % 30] : "tithiError";

        const nakshatraIndex = Math.floor(moonLongNag / (360 / 27));
        const currentNakshatra = (NAKSHATRAS && NAKSHATRAS[lang]) ? NAKSHATRAS[lang][nakshatraIndex % 27] : "nakshatraError";

        const longSum = normalize(sunLongNag + moonLongNag);
        const yogaIndex = Math.floor(longSum / (360 / 27));
        const currentYoga = (YOGAS && YOGAS[lang]) ? YOGAS[lang][yogaIndex % 27] : "yogaError";

        // Karana
        const karanaIndex = Math.floor(longDiff / 6);
        let karanaName = "";
        if (KARANAS && KARANAS[lang]) {
            if (karanaIndex === 0) karanaName = KARANAS[lang][10];
            else if (karanaIndex >= 57) {
                const fixedIndex = karanaIndex - 57;
                karanaName = KARANAS[lang][fixedIndex + 7];
            } else {
                const movableIndex = (karanaIndex - 1) % 7;
                karanaName = KARANAS[lang][movableIndex];
            }
        }

        // 5. EXTENDED FEATURES

        // Samvatsara - FIXED OFFSET
        let yearForSamvatsara = date.getFullYear();
        if (date.getMonth() < 3) yearForSamvatsara -= 1;

        // Anchor: 2026 -> 39 (Vishvavasu). 2026 - 1987 = 39.
        let samvatsaraIndex = (yearForSamvatsara - 1987) % 60;
        if (samvatsaraIndex < 0) samvatsaraIndex += 60;
        const currentSamvatsara = (SAMVATSARAS && SAMVATSARAS[lang]) ? SAMVATSARAS[lang][samvatsaraIndex] : "samvatsaraError";

        // Ayana
        const currentAyana = (AYANAS && AYANAS[lang]) ?
            ((sunLongNag >= 270 || sunLongNag < 90) ? AYANAS[lang][0] : AYANAS[lang][1])
            : "ayanaError";

        // Ritu
        let rituIndex = Math.floor(((sunLongNag + 30) % 360) / 60);
        const currentRitu = (RITUS && RITUS[lang]) ? RITUS[lang][rituIndex] : "rituError";

        // Inauspicious Times
        let sunriseTime = sunriseResult ? sunriseResult.date : date;
        let sunsetTime = sunsetResult ? sunsetResult.date : new Date(sunriseTime.getTime() + 12 * 3600 * 1000);
        let dayDurationMs = sunsetTime.getTime() - sunriseTime.getTime();
        if (dayDurationMs <= 0) dayDurationMs = 12 * 3600 * 1000;
        let partDurationMs = dayDurationMs / 8;

        const formatRange = (partIndex: number) => {
            if (!sunriseResult) return "--:--";
            let startMs = sunriseTime.getTime() + (partIndex - 1) * partDurationMs;
            let endMs = startMs + partDurationMs;
            const format = (ms: number) => new Date(ms).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            return `${format(startMs)} – ${format(endMs)}`;
        };

        const rahuIndex = (RAHU_KALAM_INDEX && RAHU_KALAM_INDEX[dayIndex]) || 0;
        const yamaIndex = (YAMAGANDA_INDEX && YAMAGANDA_INDEX[dayIndex]) || 0;
        const gulikaIndex = (GULIKA_KALAM_INDEX && GULIKA_KALAM_INDEX[dayIndex]) || 0;

        // 6. SAMAPTI (End Times) - CUSTOM SEARCH
        let tithiEndTime = "";
        let nakEndTime = "";

        try {
            if (sunriseResult) {
                // Tithi End
                const tithiTargetLen = (tithiIndex + 1) * 12;
                const tEnd = findCrossing(calcDate, getTithiLon, tithiTargetLen % 360);
                if (tEnd) tithiEndTime = formatTime(tEnd);

                // Nakshatra End
                const nakTargetLen = (nakshatraIndex + 1) * (360 / 27);
                const nEnd = findCrossing(calcDate, getNakLon, nakTargetLen % 360);
                if (nEnd) nakEndTime = formatTime(nEnd);
            }
        } catch (searchError) {
            console.error("Error in Samapti Custom Search:", searchError);
        }

        return {
            tithi: currentTithi,
            tithiEndTime: tithiEndTime,
            nakshatra: currentNakshatra,
            nakshatraEndTime: nakEndTime,
            vara: currentVara,
            yoga: currentYoga,
            karana: karanaName,
            samvatsara: currentSamvatsara,
            ritu: currentRitu,
            ayana: currentAyana,
            sunrise: sunriseResult ? formatTime(sunriseResult.date) : "--:--",
            sunset: sunsetResult ? formatTime(sunsetResult.date) : "--:--",
            rahuKalam: rahuIndex ? formatRange(rahuIndex) : "--",
            yamaganda: yamaIndex ? formatRange(yamaIndex) : "--",
            gulikaKalam: gulikaIndex ? formatRange(gulikaIndex) : "--"
        };
    } catch (e) {
        console.error("Error in getPanchanga:", e);
        throw e;
    }
};
