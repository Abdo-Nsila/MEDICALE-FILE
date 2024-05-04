import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store';
import { collection, DocumentData, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";


// Interface for error
interface Error {
    code: string;
    message: string;
}

export type UserType = {
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
    users: UserType[] | [];
    loading: boolean;
    error: Error | null;
    message: string | null;
    employeesExist: any;
}


// Initial state
const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
    message: null,
    employeesExist: null,
};




// Create slice
const get = createSlice({
    name: "get",
    initialState,
    reducers: {
        actionSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
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
        clearMessageAndError: (state) => {
            state.message = null;
            state.error = null;
        },
        setEmployeesExist: (state, action: PayloadAction<any>) => {
            state.employeesExist = action.payload;
        }
    },
});

export const { actionSuccess, actionFailed, setLoading, setMessage, clearMessageAndError, setEmployeesExist } = get.actions;

export default get.reducer;

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
export const getUsers = (): AppThunk => async dispatch => {
    dispatch(setLoading(true));
    dispatch(clearMessageAndError());
    try {
        // Get all employees
        const querySnapshot = await getDocs(query(collection(db, "users"), orderBy("role")));
        const users: DocumentData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            users.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });
        dispatch(actionSuccess(users));
    } catch (error: any) {
        dispatch(actionFailed({ code: error.code, message: error.message }));
    } finally {
        dispatch(setLoading(false));
    }
};


// Async action creator
export const getPatientsUsers = (): AppThunk => async dispatch => {
    dispatch(setLoading(true));
    dispatch(clearMessageAndError());
    try {
        // Get all employees
        const querySnapshot = await getDocs(query(collection(db, "users"), where("role", "==", "Patient")));
        const users: DocumentData = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            users.push(doc.data());
            console.log(doc.id, " => ", doc.data());
        });
        dispatch(actionSuccess(users));
    } catch (error: any) {
        dispatch(actionFailed({ code: error.code, message: error.message }));
    } finally {
        dispatch(setLoading(false));
    }
}


