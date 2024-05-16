import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

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
interface UpdatedConsultationPayload {
    updatedData: any;
}

// Interface for AuthState
interface CreateState {
    consultaion: ConsultationType | {};
    loading: boolean;
    error: Error | null;
    message: string | null;
    usersExist: any;
}

// Initial state
const initialState: CreateState = {
    consultaion: {},
    loading: false,
    error: null,
    message: null,
    usersExist: null,
};

// Create slice
const updateConsultationSlice = createSlice({
    name: "updateConsultationSlice",
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
        setusersExist: (state, action: PayloadAction<any>) => {
            state.usersExist = action.payload;
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
    setusersExist,
} = updateConsultationSlice.actions;

export default updateConsultationSlice.reducer;


export const updateConsultation =
    ({ updatedData }: UpdatedConsultationPayload): AppThunk =>
        async (dispatch) => {
            console.log(updatedData)
            // Reset message and error
            try {
                dispatch(setLoading(true));
                dispatch(clearMessageAndError());
                console.log("Updating Consultation");
                //! Update a new document with account id.
                const ref = doc(db, "consultations", updatedData.id);
                await updateDoc(ref, updatedData);
                dispatch(actionSuccess("Consultation updated successfully"));
            } catch (error) {
                dispatch(
                    actionFailed({ code: "500", message: "Update failed" })
                );
            }
        };
