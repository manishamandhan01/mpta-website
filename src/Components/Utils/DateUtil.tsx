// Import necessary libraries if required
import { format, parseISO, addDays, subDays } from 'date-fns';

/**
 * Formats a date to a human-readable string.
 * @param date - Date object or string
 * @param formatString - Desired date format (default: 'yyyy-MM-dd')
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, formatString: string = 'yyyy-MM-dd'): string => {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, formatString);
};

/**
 * Adds a specified number of days to a date.
 * @param date - Date object
 * @param days - Number of days to add
 * @returns New date
 */
export const addDaysToDate = (days: number, date: Date = new Date()): Date => {
    return addDays(date, days);
};

/**
 * Subtracts a specified number of days from a date.
 * @param date - Date object
 * @param days - Number of days to subtract
 * @returns New date
 */
export const subtractDaysFromDate = (days: number, date: Date = new Date()): Date => {
    return subDays(date, days);
};

/**
 * Checks if a date is today.
 * @param date - Date object
 * @returns Boolean indicating if the date is today
 */
export const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

export const currentTime = (): string => {
    return new Date().toLocaleTimeString('en-US', { hour12: false });
};
