import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

// Interface for User action payload
interface UpdatedUserPayload {
    email: string;
    updatedData: any;
}

// Interface for AuthState
interface CreateState {
    user: UserType | {};
    loading: boolean;
    error: Error | null;
    message: string | null;
    usersExist: any;
}

// Initial state
const initialState: CreateState = {
    user: {},
    loading: false,
    error: null,
    message: null,
    usersExist: null,
};

// Create slice
const update = createSlice({
    name: "update",
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
} = update.actions;

export default update.reducer;

// Thunk to check if user exist
export const checkUserExist =
    (docId: string, setAction: Function): AppThunk =>
        async (dispatch) => {
            try {
                const docRef = doc(db, "users", docId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    dispatch(setAction(docSnap.data()));
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                    dispatch(setAction(null));
                }
            } catch (error: any) {
                dispatch(setAction(null));
            }
        };

export const updateUser =
    ({ email, updatedData }: UpdatedUserPayload): AppThunk =>
        async (dispatch, getState) => {
            console.log(updatedData)
            // Reset message and error
            dispatch(setLoading(true));
            dispatch(clearMessageAndError());
            // Check if user already exist
            await dispatch(checkUserExist(email, setusersExist));
            console.log(getState().updateUser.usersExist);
            if (getState().updateUser.usersExist) {
                console.log("Updating user");
                //! Update a new document with account id.
                const ref = doc(db, "users", email);
                await updateDoc(ref, updatedData);
                dispatch(actionSuccess("user updated successfully"));
            } else {
                dispatch(
                    actionFailed({ code: "500", message: "Update failed" })
                );
            }
        };
