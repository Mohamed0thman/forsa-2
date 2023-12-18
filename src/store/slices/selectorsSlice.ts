import {
  SerializedError,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import agent from "../../agent/api";

interface InitialState {
  selectors: any[];
  error: SerializedError | undefined;
  isLoading: boolean;
}

const initialState: InitialState = {
  selectors: [],
  error: undefined,
  isLoading: false,
};

export const getSelectors = createAsyncThunk(
  "selectors/getSelectors",
  async (data, thunkAPI) => {
    try {
      const selectors = await agent.main.getSelectors();
      return selectors.results;
    } catch (error) {}
  }
);

const selectorSlice = createSlice({
  name: "selectors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSelectors.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSelectors.fulfilled, (state, action: any) => {
      state.selectors = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSelectors.rejected, (state, action) => {
      state.error = action.error;
      state.isLoading = false;
    });
  },
});
export default selectorSlice;
