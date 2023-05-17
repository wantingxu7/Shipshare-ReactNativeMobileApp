import {createSlice} from '@reduxjs/toolkit';


const initialState = {
	weight: 0,
};

const userSlice = createSlice({
	name: 'parcel',
	initialState,
	reducers: {
		updateWeight: (state, action) => {
			state.parcel = action.payload;
		}
	}
}
)

export const {updateWeight} = userSlice.actions;

export default userSlice.reducer;
