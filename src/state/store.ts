import { configureStore } from "@reduxjs/toolkit";
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
// --------------- Employees Slices ----------------
import getSlice from "./Users/GetSlice";
import CreateSlice from "./Users/CreateSlice";
import DeleteSlice from "./Users/DeleteSlice";
import UpdateSlice from "./Users/UpdateSlice";
import PatientAuthSlice from "./auth/PatientAuthSlice";
import DoctorAuthSlice from "./auth/DoctorAuthSlice";
import AdminAuthSlice from "./auth/AdminAuthSlice";
// --------------- Consultations Slices ----------------
import getConsultationSlice from "./Consultation/GetSlice";
import CreateConsultationSlice from "./Consultation/CreateSlice";
import UpdateConsultationSlice from "./Consultation/UpdateSlice";
import DeleteConsultationSlice from "./Consultation/DeleteSlice";


export const store = configureStore({
  reducer: {
    patientAuth: PatientAuthSlice,
    doctorAuth: DoctorAuthSlice,
    adminAuth: AdminAuthSlice,
    // Employees
    getUsers: getSlice,
    createUser: CreateSlice,
    updateUser: UpdateSlice,
    deleteUser: DeleteSlice,
    // Consultations
    getConsultations: getConsultationSlice,
    createConsultation: CreateConsultationSlice,
    updateConsultation: UpdateConsultationSlice,
    deleteConsultation: DeleteConsultationSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
