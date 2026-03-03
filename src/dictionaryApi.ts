import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dictionaryApi = createApi({
  reducerPath:"dictionaryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.dictionaryapi.dev/api/v2/entries/en/" }),
  // tagTypes:["Card"],
  endpoints: (builder) => ({
    getAudio: builder.query({
      query: (word:string):string => `${encodeURIComponent(
          word,
        )}`,
      // providesTags:["Card"]
    })
  })
  
})
export const { useGetAudioQuery } = dictionaryApi;
