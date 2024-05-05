interface AppConfig {
    appName: string,
    thesisName: string,
    author: {
        name: string,
        mentor: string,
        faculty: string,
        university: string,
    },
}

export const appConfig: AppConfig = {
    appName: "e-TZK dnevnik",
    thesisName: "Web aplikacija za evidenciju učenika u nastavi tjelesnog odgoja",
    author: {
        name: "Marta Dulibić",
        mentor: "izv.prof.dr.sc. Boris Milašinović",
        faculty: "Fakultet elektrotehnike i računarstva",
        university: "Sveučilište u Zagrebu",
    },
}