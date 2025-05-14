import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CLASSES_API_URL } from '../lib/config';

export const fetchClasses = createAsyncThunk('classes/fetchClasses', async () => {
  const response = await axios.get(CLASSES_API_URL);
  return response.data;
});

export const createClass = createAsyncThunk('classes/createClass', async (newClass) => {
  const response = await axios.post(CLASSES_API_URL, newClass);
  return response.data;
});

const classesSlice = createSlice({
  name: 'classes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchClasses.rejected, (state) => {
        state.status = 'failed'
      })
  },
});

export default classesSlice.reducer;