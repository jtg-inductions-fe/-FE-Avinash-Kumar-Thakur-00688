import { SeatDataType } from '@services';

/**
 * Takes seat array as parameter and returns in sorted form based on row and seat number
 * @param - Seats array of type `SeatDataType[]`
 */
export const sortedSeats = (seats: SeatDataType[]) =>
    [...seats].sort((a, b) => {
        if (a.row_number === b.row_number) {
            return a.seat_number - b.seat_number;
        }
        return a.row_number - b.row_number;
    });

/**
 * Generates a seat label from row and seat numbers.
 * Row 1 becomes 'A', row 2 becomes 'B', etc.
 */
export const getSeatLabel = (rowNumber: number, seatNumber: number): string =>
    `${String.fromCharCode(64 + rowNumber)}${seatNumber}`;
