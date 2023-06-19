import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const setUser = createAsyncThunk(
    'user/setUser',
    async (data) => {
        const [response] = await Promise.all([data]);
        return response;
    }
)

export const setToken = createAsyncThunk(
    'user/setToken',
    async (data) => {
        const [response] = await Promise.all([data]);
        return response;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        token: localStorage.getItem("ACCESS_TOKEN"),
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(setUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        builder.addCase(setToken.fulfilled, (state, action) => {
            state.token = action.payload
            if (action.payload) {
                localStorage.setItem("ACCESS_TOKEN", action.payload)
            } else {
                localStorage.removeItem("ACCESS_TOKEN")
            }
        })
    }
})

export const {} = userSlice.actions;
export default userSlice.reducer;