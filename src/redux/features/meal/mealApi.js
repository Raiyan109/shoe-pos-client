import { baseApi } from "../../api/baseApi";

export const mealApi = baseApi.enhanceEndpoints({ addTagTypes: ['Meals'] }).injectEndpoints({
    endpoints: (builder) => ({
        getAllMeal: builder.query({
            query: (searchTerm) => {
                const queryParam = searchTerm ? `?searchTerm=${searchTerm}` : '';
                return {
                    url: `/meal${queryParam}`,
                    method: 'GET',
                };
            },
            providesTags: ['Meals']
        }),
        getSingleMeal: builder.query({
            query: (mealId) => ({
                url: `/meal/${mealId}`,
                method: 'GET',
            }),
            providesTags: ["Meals"]
        }),
        createMeal: builder.mutation({
            query: (meal) => ({
                url: '/meal/create-meal',
                method: 'POST',
                body: meal,
            }),
            invalidatesTags: ['Meals']
        }),
        editMeal: builder.mutation({
            query: ({ mealId, formData }) => ({
                url: `/meal/${mealId}`,
                method: 'PATCH',
                body: formData
            }),
            invalidatesTags: ["Meals"]
        }),
        deleteMeal: builder.mutation({
            query: (mealId) => ({
                url: `/meal/${mealId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Meals"]
        }),
    })
})

export const { useGetAllMealQuery, useCreateMealMutation, useGetSingleMealQuery, useDeleteMealMutation, useEditMealMutation } = mealApi