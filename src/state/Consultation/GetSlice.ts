import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { collection, DocumentData, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
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
    date: Timestamp|string;
};

type PatientType = {
    fullName: string;
    CIN: string;
    date: string;
    address: string;
    phone: string;
    email: string;
    role: string;
    sex: string;
    password: string;
};


// Interface for AuthState
interface UsersState {
    consultations: ConsultationType[] | [];
    patients: PatientType[] | [];
    loading: boolean;
    error: Error | null;
    message: string | null;
}


// Initial state
const initialState: UsersState = {
    consultations: [],
    patients: [],
    loading: false,
    error: null,
    message: null,
};




// Create slice
const getConsultations = createSlice({
    name: "getConsultations",
    initialState,
    reducers: {
        actionSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.consultations = action.payload;
            state.error = null;
        },
        actionFailed: (state, action: PayloadAction<Error | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        setPatients: (state, action: PayloadAction<any>) => {
            state.patients = action.payload;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setMessage: (state, action: PayloadAction<string | null>) => {
            state.message = action.payload;
        },
        clearMessageAndError: (state) => {
            state.message = null;
            state.error = null;
        },
    },
});

export const { actionSuccess, actionFailed, setPatients, setLoading, setMessage, clearMessageAndError } = getConsultations.actions;

export default getConsultations.reducer;

//! Async action creator
// export const observeAuthState = (): AppThunk => dispatch => {
//   onAuthStateChanged(auth, user => {
//     console.log("User: ", user)
//     if (user) {
//       dispatch(loginSuccess(user.providerData[0]));
//     } else {
//       dispatch(logout());
//     }
//   });
// };



// Async action creator
export const getPatientsUsers = (): AppThunk => async dispatch => {
    dispatch(clearMessageAndError());
    try {
        // Get all employees
        const querySnapshot = await getDocs(query(collection(db, "users"), where("role", "==", "Patient")));
        const patients: DocumentData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            patients.push(doc.data());
        });
        dispatch(setPatients(patients));
    } catch (error: any) {
        dispatch(actionFailed({ code: error.code, message: error.message }));
    } finally {
        dispatch(setLoading(false));
    }
}



// Async action creator
export const getDoctorConsultations = (email: string): AppThunk => async dispatch => {
    dispatch(setLoading(true));
    dispatch(clearMessageAndError());
    try {
        // Get all employees
        const querySnapshot = await getDocs(query(collection(db, "consultations"), where("doctorEmail", "==", email)));
        const consultations: DocumentData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            consultations.push({
                ...doc.data(),
                date: doc.data().date.toDate().toLocaleDateString(),
            });
        });
        dispatch(actionSuccess(consultations));
    } catch (error: any) {
        dispatch(actionFailed({ code: error.code, message: error.message }));
    } finally {
        dispatch(setLoading(false));
    }
}

// Async action creator
export const getPatientConsultations = (email: string): AppThunk => async dispatch => {
    dispatch(setLoading(true));
    dispatch(clearMessageAndError());
    try {
        // Get all employees
        const querySnapshot = await getDocs(query(collection(db, "consultations"), where("patientEmail", "==", email)));
        const consultations: DocumentData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            consultations.push(doc.data());
        });
        dispatch(actionSuccess(consultations));
    } catch (error: any) {
        dispatch(actionFailed({ code: error.code, message: error.message }));
    } finally {
        dispatch(setLoading(false));
    }
}


