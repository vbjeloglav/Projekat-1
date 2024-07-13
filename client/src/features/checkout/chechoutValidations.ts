import * as yup from 'yup';

export const validationsShema =[
    yup.object({

        fulName: yup.string().required('Potrebno je unijeti puno ime i prezime'),
        address1: yup.string().required('Adresa 1 je obavezna'),
        address2: yup.string().required('Adres2 je obavezna'),
        city: yup.string().required('Grad je obavezan'),
        state: yup.string().required('Drzava je obavezna'),
        zip: yup.string().required('Zip kod je obavezan')
     
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required()
    })



] 