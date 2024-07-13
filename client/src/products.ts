export interface Products{
    
        id: number;
        ime: string;
        kategorija: string;
        opis: string;
        slika: string;
        kolicinaNaStanju?: number;
        cijena: number;
        karakteristike?: string;
        velicina?: string;
      
}
export interface ProductParams{
        searchTerm?:string[];
        kategorijaa?:string[];
        pageNumber: number;
        pageSize: number;
}