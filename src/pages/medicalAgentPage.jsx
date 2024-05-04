import React from 'react';
import { Button } from "@material-tailwind/react";

const PatientPage = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <section className="flex justify-center items-center h-screen" style={{ background: "linear-gradient(to right, #8e2de2, #4a00e0)"}}>
            <div className="w-full max-w-xl">
                <div className='text-white text-4xl font-bold text-center mb-8'>Medical Agent Page</div>
                <form onSubmit={handleSubmit}>
                    <div className="text-[#93c5fd] text-xl font-bold mb-2">Consultation :</div>
                    <br />
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-consultation-datetime">
                                Date and Time
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-consultation-datetime" type="datetime-local" />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-doctor">
                                Doctor
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-doctor" type="text" placeholder="Doctor's Name" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-consultation-reason">
                                Reason for consultation
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-consultation-reason" type="text" placeholder="Enter Reason for consultation" />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-symptoms">
                                Symptoms
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-symptoms" type="text" placeholder="Enter the symptoms" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-consultation-physical">
                                Results of Physical Examinations
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-consultation-physical" type="text" placeholder="Enter Results of Physical Examinations" />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-consultation-tests">
                                Diagnostic Tests
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-consultation-tests" type="text" placeholder="Enter Diagnostic Tests" />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-medication-prescription">
                                Medication Prescription
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border
                                -gray-500" id="grid-medication-prescription" type="text" placeholder="Enter Medication Prescription" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-specialists">
                                        References to Specialists
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-specialists" type="text" placeholder="Enter References to Specialists" />
                                </div>
                            </div>
        
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-appointment-tracking">
                                        Appointment Tracking
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-appointment-tracking" type="text" placeholder="Enter Appointment Tracking" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="grid-progress-notes">
                                        Progress Notes
                                    </label>
                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-progress-notes" type="text" placeholder="Enter Progress Notes" />
                                </div>
                            </div>
        
                            <div className="flex flex-wrap -mx-3 mb-6 justify-center">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <Button className="mt-6 w-full" fullWidth type="submit">Next</Button>
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <Button className="mt-6 w-full" fullWidth type="submit">Back</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            )
        }
        
        export default PatientPage;