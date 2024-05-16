import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Interface for error
interface Error {
  code: string;
  message: string;
}

export type ConsultationType = {
  id: string;
  doctor: string;
  doctorEmail: string;
  patient: string;
  patientEmail: string;
  reason: string;
  result: string;
  medication: string;
  date: Timestamp;
};

// Interface for User action payload
interface UserPayload {
  userData: ConsultationType;
}

// Interface for AuthState
interface CreateState {
  user: ConsultationType | {};
  loading: boolean;
  error: Error | null;
  message: string | null;
}

// Initial state
const initialState: CreateState = {
  user: {},
  loading: false,
  error: null,
  message: null,
};

// Create slice
const createConsultation = createSlice({
  name: "createConsultation",
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
} = createConsultation.actions;

export default createConsultation.reducer;

export const createConsultationAction =
  (userData: any): AppThunk =>
    async (dispatch) => {
      console.log(userData)
      try {

        // Reset message and error
        dispatch(setLoading(true));
        dispatch(clearMessageAndError());
        // Check if user already exist
        console.log("Creating Consultations...");
        //! Add a new document with account id.
        await setDoc(doc(db, "consultations", userData.id), {
          ...userData,
        });
      } catch (error) {
        dispatch(actionFailed({ code: error.code, message: error.message }));
      }
    };
