import { Timestamp } from "firebase/firestore";

interface LoginData {
    email: string;
}

export interface Reminder {
    dateTime: number;
    message: string;
    reminderId: string;
    reminderType: string;
}


export type MeasurementEntry = {
    date: Timestamp;
    measurementValue: number;
}
type MeasurementType = Record<string, MeasurementEntry> 

export type MeasurementsData = Record<string, MeasurementType>

type PersonalData = {
    name?: string,
    lastName?: string,
    birthday?: {
      nanoseconds: number,
      seconds: number,
    };
    address?: string;
    tel?: number;
    PESEL?: number;
    gender?: string;
    email?: string;

}

export type UserData = {
    loginData: LoginData;
    measurements: MeasurementsData;
    personalData: PersonalData;
    reminders: Reminder[];
    medicines: any;
}

