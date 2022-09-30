import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Node = {
  value: string;
  href: string;
};

export interface NavbarState {
  value: Node[];
}

const initialState: NavbarState = {
  value: [{ value: "Protest", href: "/" }],
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.value.push(action.payload);
    },
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNode, setNodes } = navbarSlice.actions;

export default navbarSlice.reducer;
