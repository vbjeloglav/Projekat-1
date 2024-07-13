import * as yup from 'yup';

export const validationShema = yup.object({
    ime: yup.string().required(),
    kategorija: yup.string().required(),
    karakteristike: yup.string().required(),

    cijena: yup.number().required().moreThan(100),
    kolicinaNaStanju: yup.number().required(),
    opis: yup.string().required(),
   /* file: yup.mixed().when('slika', {
        is:(value:string) => !value,
        then: yup.mixed().required('Molim Vas unesite siku')
        

    })
    file: yup.mixed()*/
})