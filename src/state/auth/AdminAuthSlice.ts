import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, store } from '../store';
import { auth, db } from '@/firebase/firebase';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import Cookies from 'universal-cookie';
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";

const cookies = new Cookies(null, { path: '/' });


// Interface for login action payload
interface LoginPayload {
    email: string;
    password: string;
}
interface signUpPayload {
    CIN: string;
    email: string;
    password: string;
    fullName: string;
    date: string;
    sexe: "Homme" | "Femme";
    adress: string;
    phone: string;
    role: string;
}

interface UserProfileState {
    uid?: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: string;
}

// Interface for error
interface Error {
    code: string;
    message: string;
}

// Interface for AuthState
interface AuthState {
    user: any,
    isLogin: boolean;
    isLoading: boolean;
    message: string | null;
    error: Error | null;
}


// Initial state
const initialState: AuthState = {
    user: null,
    isLogin: false,
    isLoading: false,
    message: null,
    error: null,
};

// Create slice
const adminAuth = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        actionSuccess: (state) => {
            state.isLogin = true;
            state.isLoading = false;
            state.error = null;
        },
        actionFailed: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action: PayloadAction<DocumentData | UserProfileState | null>) => {
            state.user = action.payload ? { ...state.user, ...action.payload } : null;
        },
        setMessage: (state, action: PayloadAction<string | null>) => {
            state.message = action.payload;
        },
        clearMessageAndError: (state) => {
            state.message = null;
            state.error = null;
        },
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
        },
    },
});

export const { actionSuccess, actionFailed, setUser, setLoading, setMessage, clearMessageAndError, logout } = adminAuth.actions;

export default adminAuth.reducer;

//! Async action creator
// export const observeAuthState = (): AppThunk => dispatch => {
//   onAuthStateChanged(auth, user => {
//     console.log("User: ", user)
//     if (user) {
//       dispatch(actionSuccess(user.providerData[0]));
//     } else {
//       dispatch(logout());
//     }
//   });
// };


export const checkUserExist = (docId: string): AppThunk => async dispatch => {
    try {
        console.log(docId)
        const docRef = doc(db, "users", docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            if (docSnap.data().role == "Admin") {
                console.log("Document data:", docSnap.data());
                dispatch(setUser(docSnap.data()));
            } else {
                dispatch(setUser(null));
            }
        } else {
            console.log("No such document!")
            // docSnap.data() will be undefined in this case
            dispatch(setUser(null));
        }
    } catch (error: any) {
        console.log("No such document! 2")
        dispatch(setUser(null));;
    }
}

export const getUserProfile = (): AppThunk => async dispatch => {
    try {
        const user = auth.currentUser;
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            // const uid = user.uid;
            dispatch(setUser({ email, displayName, photoURL, emailVerified }));
        }
    } catch (error: any) {
        dispatch(actionFailed({ code: "500", message: error }));
    }
}


export const updatePhotoProfile = (photoURL: string, currentEmail: string): AppThunk => async dispatch => {
    try {
        dispatch(setLoading(true));
        dispatch(clearMessageAndError())
        const user = auth.currentUser;
        if (user !== null) {
            await updateProfile(user, {
                photoURL
            }).then(async () => {
                dispatch(setLoading(false));
                // get the updated user profile
                console.log(currentEmail)
                await dispatch(checkUserExist(currentEmail));
                await dispatch(getUserProfile());
                const state = store.getState();
                cookies.set('user', JSON.stringify(state.adminAuth.user), { path: '/' });
            }).catch((error) => {
                dispatch(setLoading(false));
                dispatch(actionFailed({ code: error.code, message: error.message }));
            });
        }
    } catch (error: any) {
        dispatch(setLoading(false));
        dispatch(actionFailed({ code: error.code, message: error.message }));
    }
};


export const createUser =
    (user: signUpPayload): AppThunk =>
        async (dispatch, getState) => {
            console.log(user)
            // Reset message and error
            dispatch(setLoading(true));
            dispatch(clearMessageAndError());
            // Check if user already exist
            await dispatch(checkUserExist(user.email));
            if (!getState().adminAuth.user) {
                console.log("Creating User");
                //! Add a new document with account id.
                await setDoc(doc(db, "users", user.email), {
                    ...user,
                });
                //! Create user with email and password
                createUserWithEmailAndPassword(auth, user.email, user.password)
                    .then(async () => {
                        dispatch(actionSuccess());
                        dispatch(setMessage("User created successfully"));
                    })
                    .catch(() => {
                        dispatch(setLoading(false));
                        dispatch(actionSuccess());
                        dispatch(setMessage("User created successfully / The User account is already exist"))
                    });
            } else {
                dispatch(
                    actionFailed({ code: "500", message: "User already exists" })
                );
            }
        };

// Async action creator
export const login = ({ email, password }: LoginPayload): AppThunk => async (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(clearMessageAndError())
    await dispatch(checkUserExist(email));
    if (getState().adminAuth.user) {
        console.log(email, password)
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                dispatch(getUserProfile());
                if (getState().adminAuth.error) {
                    throw new Error("Failed to get user profile");
                }
                cookies.set('user', JSON.stringify(getState().adminAuth.user), { path: '/' });
                dispatch(actionSuccess());
                dispatch(setMessage("User logged in successfully!"));
                console.log("User logged in successfully!", getState().adminAuth.user);
            })
            .catch((error: any) => {
                dispatch(setLoading(false));
                dispatch(actionFailed({ code: error.code, message: error.message }));
            });
    } else {
        dispatch(setLoading(false));
        dispatch(actionFailed({ code: "500", message: "User Credential is not valid" }));
    }
};

// Async action creator
export const logoutUser = (): AppThunk => async dispatch => {
    try {
        dispatch(clearMessageAndError())
        await signOut(auth);
        cookies.remove('user', { path: '/' });
        dispatch(setLoading(false));
        dispatch(logout());
    } catch (error: any) {
        dispatch(actionFailed({ code: error.code, message: error.message }));
    }
};


// Async action creator
export const resetPassword = (email: string): AppThunk => async dispatch => {
    dispatch(setLoading(true));
    dispatch(clearMessageAndError())
    sendPasswordResetEmail(auth, email)
        .then(() => {
            dispatch(setLoading(false));
            dispatch(setMessage("Password reset email sent!"))
        })
        .catch((error) => {
            dispatch(setLoading(false));
            dispatch(actionFailed({ code: error.code, message: error.message }));
        });
};
