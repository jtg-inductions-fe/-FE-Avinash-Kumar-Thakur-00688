import { DateFormatter } from './utils.types';

/**
 * Function to format the date
 *
 * @param date - Date which need to be format
 * @param options - options given for the date format
 * @returns Returns the formatted date
 */
export const formatDate = ({ date, options = {} }: DateFormatter) => {
    const {
        day = '2-digit',
        month = 'short',
        year,
        locale = 'en-IN',
        weekday,
    } = options;

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return '';

    const formatter = new Intl.DateTimeFormat(locale, {
        weekday,
        day,
        month,
        year,
    });

    return formatter.format(parsedDate);
};

/**
 *Function to format amount

 * @param amount - Amount which need to be formatted
 * @returns Returns formatted amount
 */
export const formatAmount = (amount: number) => {
    if (isNaN(amount)) return '';

    return Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
};

/**
 * Function to format time
 *
 * @param date - Date which need to be formatted
 * @returns Returns formatted date
 */
export const formatTime = (date: string) => {
    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return '';

    return Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(parsedDate);
};
