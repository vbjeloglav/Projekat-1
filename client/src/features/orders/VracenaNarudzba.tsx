import React, { useState } from 'react';
import axios from 'axios';
import { BasketItem } from '../../app/layout/models/basket';
import { Order } from '../../app/layout/models/order';
interface Props{
    items: BasketItem[];
    isBasket?: boolean;
    isOrder?: boolean;
    days: any,
    orderId:Order[];
}


const ReturnOrderedItem = ({items, orderId}:Props) => {
   
        const [isChecked1, setIsChecked1] = useState(false);
        const [isChecked2, setIsChecked2] = useState(true);
      
        const handleCheckbox1Change = async () => {
            setIsChecked1(!isChecked1); // Preokreni trenutno stanje isChecked1
            setIsChecked2(false); // Postavi isChecked2 na false
    
            try {
                {items.map(item => (
               
                console.log(item.productId)
                
                // Ovdje pozovite API endpoint ili funkciju za povećanje količine proizvoda
            ))}
            
           
    
                alert('Količina je povećana.'); // Obavijestite korisnika da je količina povećana
                // Dodajte logiku za ažuriranje stanja na korisničkom interfejsu ako je potrebno
          
            } catch (error) {
                alert('Greška prilikom povećanja količine.');
                console.error('API Error:', error);
            }

        };
    
        const handleCheckbox2Change = () => {
            setIsChecked2(!isChecked2); // Preokreni trenutno stanje isChecked2
            setIsChecked1(false); // Postavi isChecked1 na false
        };


    
   

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked1}
                    onChange={handleCheckbox1Change}
                />
                DA
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={isChecked2}
                    onChange={handleCheckbox2Change}
                />
                NE
            </label>
        </div>
    );
};

export default ReturnOrderedItem;

