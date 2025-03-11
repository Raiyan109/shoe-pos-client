import { baseApi } from "../../api/baseApi";

export const workoutPlansApi = baseApi.enhanceEndpoints({ addTagTypes: ["WorkoutPlans"] }).injectEndpoints({
    endpoints: (builder) => ({
        getWorkoutPlans: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/workout-plan${queryParam}`,
                    method: 'GET',
                };
            },
            providesTags: ["WorkoutPlans"]
        }),
        getSingleWorkoutPlan: builder.query({
            query: (workoutPlanId) => ({
                url: `/workout-plan/${workoutPlanId}`,
                method: 'GET',
            }),
            providesTags: ["WorkoutPlans"]
        }),
        createWorkoutPlan: builder.mutation({
            query: (workoutPlan) => ({
                url: '/workout-plan/create-workout-plan',
                method: 'POST',
                body: workoutPlan,
            }),
            invalidatesTags: ["WorkoutPlans"]
        }),
        editWorkoutPlan: builder.mutation({
            query: ({ workoutPlanId, formData }) => ({
                url: `/workout-plan/${workoutPlanId}`,
                method: 'PATCH',
                body: formData
            }),
            invalidatesTags: ["WorkoutPlans"]
        }),
        deleteWorkoutPlan: builder.mutation({
            query: (workoutPlanId) => ({
                url: `/workout-plan/delete/${workoutPlanId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["WorkoutPlans"]
        }),
    })
})

export const { useGetWorkoutPlansQuery, useGetSingleWorkoutPlanQuery, useCreateWorkoutPlanMutation, useEditWorkoutPlanMutation, useDeleteWorkoutPlanMutation } = workoutPlansApi