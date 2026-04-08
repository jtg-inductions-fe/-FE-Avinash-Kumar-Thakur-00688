import { BookingApiResponseType } from '@services';

/**
 * Type of booking card props
 */
export interface BookingCardProps {
    /**
     * Item which consist of details that need to be rendered in booking card
     */
    item: BookingApiResponseType;
    /**
     * Status of the booking
     */
    status: 'BOOKED' | 'CANCELLED';
}

/**
 * Response type of getStatus function
 */
export interface StatusResponse {
    /**
     * Status label
     */
    label: string;
    /**
     * Color to be used in chip
     */
    color:
        | 'error'
        | 'success'
        | 'default'
        | 'primary'
        | 'secondary'
        | 'info'
        | 'warning';
}
