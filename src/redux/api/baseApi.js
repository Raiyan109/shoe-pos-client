import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.10.18:3500/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token

            const verifyToken = localStorage.getItem("verify-token");

            // if (token) {
            //     headers.set('authorization', `Bearer ${token}`)
            // }

            // // Set verify-token only when needed (for password reset routes)
            // if (verifyToken) {
            //     headers.set('authorization', verifyToken);
            // }

            if (verifyToken) {
                headers.set('authorization', verifyToken); // For OTP submission
            } else if (token) {
                headers.set('authorization', `Bearer ${token}`); // For authenticated requests
            }

            return headers
        },
        credentials: 'include',
    }),
    tagTypes: ['Meals', 'Terms', 'Privacy', 'About', "Badges", "WorkoutVideos", "Workouts", "WorkoutPlans", "Exercises"],
    endpoints: () => ({})
})