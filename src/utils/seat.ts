import { SeatDataType } from '@services';

/**
 * Takes seat array as parameter and returns in sorted form based on row and seat number
 * @seats - Seats array of type `SeatDataType[]`
 */
export const sortedSeats = (seats: SeatDataType[]) =>
    [...seats].sort((a, b) => {
        if (a.row_number === b.row_number) {
            return a.seat_number - b.seat_number;
        }
        return a.row_number - b.row_number;
    });
