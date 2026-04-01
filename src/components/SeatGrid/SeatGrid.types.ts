import { Dispatch, SetStateAction } from 'react';

/**
 * Props type of the seat grid component
 */
export interface SeatGridProps {
    /**
     * Seats which need to be displayed, it is a 2D array consisting of boolean value
     */
    seats: boolean[][];
    /**
     * Seat selected by user
     */
    selectedSeats: Set<string>;
    /**
     * Function that handle selection of seats
     */
    setSelectedSeats: Dispatch<SetStateAction<Set<string>>>;
}
