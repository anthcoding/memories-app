import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
	posts: [],
};

export const getPosts = createAsyncThunk(
	'posts/getPosts',
	async (obj, { dispatch, getState }) => {
		const state = getState();
		try {
			const { data } = await api.fetchPosts();
		} catch (error) {}
	}
);

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		[getPosts.pending]: (state, action) => {
			state.status = 'loading';
		},
		[getPosts.fulfilled]: (state, { payload }) => {
			state.posts = payload;
			state.status = 'success';
		},
		[getPosts.rejected]: (state, action) => {
			state.status = 'failed';
		},
	},
});

// Action creators are generated for each case reducer function
// export const { someAction } = postsSlice.actions;

export default postsSlice.reducer;
