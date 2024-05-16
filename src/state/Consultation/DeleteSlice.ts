import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { getDoctorConsultations } from "./GetSlice";

// Interface for error
interface Error {
  code: string;
  message: string;
}

// Interface for DeleteState
interface DeleteState {
  loading: boolean;
  error: Error | null;
  message: string | null;
}

// Initial state
const initialState: DeleteState = {
  loading: false,
  error: null,
  message: null,
};

// Create slice
const deleteConsultationSlice = createSlice({
  name: "deleteConsultation",
  initialState,
  reducers: {
    actionSuccess: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.message = action.payload;
    },
    actionFailed: (state, action: PayloadAction<Error | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    setError: (state, action: PayloadAction<Error | null>) => {
      state.error = action.payload;
    },
    clearMessageAndError: (state) => {
      state.message = null;
      state.error = null;
    },
  },
});

export const {
  actionSuccess,
  actionFailed,
  setLoading,
  setMessage,
  setError,
  clearMessageAndError,
} = deleteConsultationSlice.actions;

export default deleteConsultationSlice.reducer;

// Thunk to delete employee
export const deleteConsultation =
  (docId: string, doctorEmail: string): AppThunk =>
    async (dispatch) => {
      // Reset message and error
      dispatch(setLoading(true));
      dispatch(clearMessageAndError());
      try {
        // Delete employee document
        await deleteDoc(doc(db, "consultations", docId));
        dispatch(actionSuccess("Consultation deleted successfully"));
        dispatch(getDoctorConsultations(doctorEmail));
      } catch (error: any) {
        dispatch(actionFailed({ code: error.code, message: error.message }));
      }
    };
