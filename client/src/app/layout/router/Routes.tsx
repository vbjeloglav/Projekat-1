import { Navigate, createBrowserRouter } from "react-router-dom"
import App from "../../../App"
import Catalog from "../../../features/catalog/Catalog"
import AboutePage from "../../../features/about/AboutPage"
import ContactPage from "../../../features/Contact/ContactPage"
import ProductDetail from "../../../features/catalog/ProductDetail"
import CatalogE_biciklo from "../../../features/catalog/CatalogE_biciklo"
import E_bicikloDetail from "../../../features/catalog/E_bicikloDetail"
import CatalogSkijanje from "../../../features/catalog/CatalogSkijanje"
import SkijanjeDetail from "../../../features/catalog/SkijanjeDetal"
import CatalogKvad from "../../../features/catalog/CatalogKvad"
import KvadoviDetail from "../../../features/catalog/KvadoviDetail"
import CatalogKajak from "../../../features/catalog/CatalogKajak"
import KajakDetail from "../../../features/catalog/KajakDetail"
import CatalogKampovanje from "../../../features/catalog/CatalogKampovanje"
import KampovanjeDetail from "../../../features/catalog/KampovanjeDetail"
import CatalogPlaninarenje from "../../../features/catalog/CatalogPlaninarenje"
import PlaninarenjeDetail from "../../../features/catalog/PlaninarenjeDetail"
import ServerError from "../../errors/ServerErrors"
import NotFound from "../../errors/NotFound"
import BasketPage from "../../../features/basket/BasketPage"
import CheckoutPage from "../../../features/checkout/CheckoutPage"
import Login from "../../../features/account/Login"
import Register from "../../../features/account/Register"
import RequireAuth from "./RequireAuth"
import Orders from "../../../features/orders/Orders"
import CheckoutWrapper from "../../../features/checkout/CheckoutWrapper"
import HomePage from "../../../features/Home/HomePage"
import Inventory from "../../../features/admin/Inventory"
import GotovinaPage from "../../../features/gotovina/GotovinaPage"
import PregledNarudzbe from "../../../features/admin/PregeledNarudzbe"
import OrdersAll from "../../../features/orders/OrderAll"
import Reservation from "../../../features/rezervisanje/Reservation"




export const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            //authenticated routes
            {element:<RequireAuth/>, children:[
                {path:'checkout', element:<CheckoutWrapper/>},
                {path:'orders', element:<Orders/>},
                {path:'rezervisano', element:<Reservation/>},
               
               


            ]},
            //adminRoutes
            {element:<RequireAuth roles={['Admin']}/>, children:[
              
                {path:'inventory', element:<Inventory/>},
                {path:'gotovina', element:<GotovinaPage/>},
                {path:'preglednarudzbe', element:<OrdersAll/>},



            ]},
            {path:'catalog', element:<Catalog/>},
            {path:'catalog/:id', element:<ProductDetail/>},
            {path:'catalogE_biciklo', element:<CatalogE_biciklo/>},
            {path:'catalogE_biciklo/:id', element:<E_bicikloDetail/>},
            {path:'catalogSkijanje', element:<CatalogSkijanje/>},
            {path:'catalogSkijanje/:id', element:<SkijanjeDetail/>},
            {path:'catalogKvadovi', element:<CatalogKvad/>},
            {path:'catalogKvadovi/:id', element:<KvadoviDetail/>},
            {path:'catalogKajak', element:<CatalogKajak/>},
            {path:'catalogKajak/:id', element:<KajakDetail/>},
            {path:'catalogKampovanje', element:<CatalogKampovanje/>},
            {path:'catalogKampovanje/:id', element:<KampovanjeDetail/>},
            {path:'catalogPlaninarenje', element:<CatalogPlaninarenje/>},
            {path:'catalogPlaninarenje/:id', element:<PlaninarenjeDetail/>},
            {path:'about', element:<AboutePage/>},
            {path:'contact', element:<ContactPage/>},
            {path:'server-error', element:<ServerError/>},
            {path:'not-found', element:<NotFound/>},
            {path:'basket', element:<BasketPage/>},
            {path:'prijava', element:<Login/>},
            {path:'registracija', element:<Register/>},
            
            {path:'*', element:<Navigate replace to='/not-found'/>},
           

        ]
    }
])