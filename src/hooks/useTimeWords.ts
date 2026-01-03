"use client";

import { useState, useEffect } from 'react';

const HOURS = [
    "twelve", "one", "two", "three", "four", "five",
    "six", "seven", "eight", "nine", "ten", "eleven"
];

const MINUTES: Record<number, string> = {
    5: "five",
    10: "ten",
    15: "quarter",
    20: "twenty",
    25: "twenty-five",
    30: "half"
};

export function useTimeWords() {
    const [timeString, setTimeString] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();

            // Round to nearest 5
            let roundedMinutes = Math.round(minutes / 5) * 5;

            // Handle rolling into next hour
            if (roundedMinutes === 60) {
                roundedMinutes = 0;
                hours += 1;
            }

            // Normalize hour (0-11)
            const normalizedHour = hours % 12; // 0 is 12, 1 is 1, etc.

            // Logic for phrasing
            let phrase = "";
            const hourWord = HOURS[normalizedHour];

            if (roundedMinutes === 0) {
                // "it is [hour] o'clock" or just "it is [hour]"? 
                // User examples just showed "it is ten to seven".
                // Let's go with "it is [hour] o'clock" for exact hours for clarity.
                phrase = `it is ${hourWord} o'clock`;
            } else if (roundedMinutes <= 30) {
                // "past"
                const minuteWord = MINUTES[roundedMinutes];
                phrase = `it is ${minuteWord} past ${hourWord}`;
            } else {
                // "to" [next hour]
                const minutesTo = 60 - roundedMinutes;
                const nextHourIndex = (normalizedHour + 1) % 12;
                const nextHourWord = HOURS[nextHourIndex];
                const minuteWord = MINUTES[minutesTo];
                phrase = `it is ${minuteWord} to ${nextHourWord}`;
            }

            setTimeString(phrase);
        };

        // Initial update
        updateTime();

        // Update every 10 seconds to catch minute changes reasonably fast
        const interval = setInterval(updateTime, 10000);

        return () => clearInterval(interval);
    }, []);

    return timeString;
}
