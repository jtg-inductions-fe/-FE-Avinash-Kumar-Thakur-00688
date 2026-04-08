import { baseApi } from 'services/BaseApi';

import { API_METHODS, API_TAGS, API_URL } from '@constant';

import {
    BookingApiRequestType,
    BookingApiResponseType,
    SeatApiResponseType,
    SlotDetailsApiResponseType,
    UserBookingsParamsType,
} from './Booking.types';

/**
 * It consists of booking endpoints
 */
export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * It takes id and returns the details of slot
         */
        slotDetails: builder.query<SlotDetailsApiResponseType, string>({
            query: (id) => ({
                url: `${API_URL.SLOT}${encodeURIComponent(id)}`,
                method: API_METHODS.GET,
            }),
        }),
        /**
         * It takes the id of the slot and returns seats of that slot
         */
        seats: builder.query<SeatApiResponseType, string>({
            query: (id) => ({
                url: `${API_URL.SLOT}${encodeURIComponent(id)}/seats`,
                method: API_METHODS.GET,
            }),
            providesTags: [API_TAGS.SEATS],
        }),
        /**
         * It takes slot id, seat number and booked the seat for the user
         */
        booking: builder.mutation<
            BookingApiResponseType,
            BookingApiRequestType
        >({
            query: (data) => ({
                url: API_URL.BOOKING,
                method: API_METHODS.POST,
                body: data,
            }),
            invalidatesTags: [API_TAGS.SEATS, API_TAGS.USER_BOOKINGS],
        }),
        /**
         * It returns all bookings of user
         */
        userBookings: builder.query<
            BookingApiResponseType[],
            UserBookingsParamsType
        >({
            query: (params) => {
                const { status, slot } = params;

                return {
                    url: API_URL.USER_BOOKINGS,
                    method: API_METHODS.GET,
                    params: {
                        ...(status && { status }),
                        ...(slot && { slot: slot }),
                    },
                };
            },
            providesTags: [API_TAGS.USER_BOOKINGS],
        }),
        /**
         * It takes seats that need to be cancel
         */
        cancelBooking: builder.mutation<
            BookingApiResponseType,
            BookingApiRequestType
        >({
            query: (data) => ({
                url: API_URL.CANCEL_BOOKINGS,
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_TAGS.SEATS, API_TAGS.USER_BOOKINGS],
        }),
    }),
});

export const {
    useSlotDetailsQuery,
    useSeatsQuery,
    useBookingMutation,
    useUserBookingsQuery,
    useCancelBookingMutation,
} = bookingApi;
