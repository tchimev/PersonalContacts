export interface IPerson {
    id: number;
    firstName: string;
    surname: string;
    birthDate: Date;
    phoneNumber: string;
    iban: string;
    country: string;
    city: string;
    street: string;
    zipCode: string;
}

export interface IPersonState {
    persons: IPerson[];
    isLoading: boolean;
}