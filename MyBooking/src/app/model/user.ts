export interface User {
    userId: string;
    name: string;
    email: string;
    mobile: number;
    password: string;
};

export interface Movies {
    id?: any;
    movieName?: string;
    movieGenere?: any[];
    movieLanguage?: any[];
    imgURL?: string;
    movieDuration?: any;
    movieCategory?: string;
    movieLaunchDate?: any;
}