export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export const genderToCroatian = (gender: Gender): string => {
    switch (gender) {
        case Gender.MALE:
            return 'Muško';
        case Gender.FEMALE:
            return 'Žensko';
        default:
            return '';
    }
};