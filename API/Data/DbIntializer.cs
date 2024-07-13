using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public class DbIntializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName="Marko",
                    Email="marko@test.com"
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User{
                    UserName="admin",
                    Email="admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[]{"Member", "Admin"});
            }

            if(context.Oprema.Any()) return;
            var oprema = new List<Product>
            {
                new Product
                {
                    Ime="Head X-RUBI III, mtb bicikl",
                    Opis="X-Rubi III je brdski bicikl od 29 inča napravljen za bicikliranje po šumskim stazama i putevima. Već na prvi pogled oduševljava modernim izgledom i zanimljivom geometrijom koja omogućuje stabilan položaj za volanom te učinkovit prenos energije na usponima i spustovima.",
                    Cijena=50,
                    Slika="/Images/Biciklizam/1.jpg",
                    KolicinaNaStanju=5,
                    
                    Kategorija="biciklizam",
                    Karakteristike="Head",
                    Velicina="",
                },
                new Product
                {
                    Ime="Nakamura FUSION 1.2, mtb bicikl",
                    Opis="Nakamura Fusion 1.2 je svestrani brdski bicikl koji biciklisti pruža dobru osnovu za uspon i spust ili ipak za opuštene ture po svim terenima. 26-inčni točkovi osiguravaju okretnost.",
                    Cijena=50,
                    Slika="/Images/Biciklizam/2.jpg",
                    KolicinaNaStanju=4,
                    
                    Kategorija="biciklizam",
                    Karakteristike="Nakamura",
                     Velicina="",

                    
                },
                new Product
                {
                    Ime="Genesis IMPACT 4.2 W, mtb bicikl",
                    Opis="Genesis Impact 4.2 W je ženski brdski bicikl koji je primjeren za upoznavanje s tim dinamičnim sportom u prirodi. Geometrija okvira je prilagođena nježnijem spolu. Gornja cijev je malo spuštena što omogućuje lakši pristup, a osim toga osigurava sigurniji osjećaj za volanom.",
                    Cijena=40,
                    Slika="/Images/Biciklizam/3.jpg",
                    KolicinaNaStanju=10,
                  
                    Kategorija="biciklizam",
                    Karakteristike="Genesis",
                     Velicina="",
                
                },
                 new Product
                {
                    Ime="Genesis IMPACT 4.2, mtb bicikl",
                    Opis="Genesis Impact 4.2 je muški brdski bicikl koji je primjeren za upoznavanje s tim dinamičnim sportom u prirodi. 29-inčni obruči udobno se kotrljaju preko prepreka.",
                    Cijena=60,
                    Slika="/Images/Biciklizam/4.jpg",
                    KolicinaNaStanju=10,
                   
                    Kategorija="biciklizam",
                    Karakteristike="Genesis",
                     Velicina="",
                   
                },
                new Product
                {
                    Ime="Nakamura FUSION 3.2, mtb bicikl",
                    Opis="Nakamura Fusion 3.2 kvalitetan je 29-inčni brdski bicikl namijenjen svim brdskim biciklistima koji tek upoznavaju ljepote brdskog biciklizma. S ovim biciklom moći ćete bezbrižno otkrivati ​prirodu i prilagoditi se svim specifičnim zahtjevima vožnje biciklom po biciklističkim stazama, šumi i planinskim stazama.",
                    Cijena=40,
                    Slika="/Images/Biciklizam/5.jpg",
                    KolicinaNaStanju=11,
                    
                    Kategorija="biciklizam",
                    Karakteristike="Nakamura",
                     Velicina="",
                    
                },
                new Product
                {
                    Ime="Genesis MELISSA 24, mtb bicikl",
                    Opis="Genesis Melissa 24 brdskih bicikala za malu raju. Ima sve što imaju veliki bicikli: lagani aluminijski okvir s prilagođenom geometrijom, opružne vilice, 21 brzina i V-brake kočnice.",
                    Cijena=30,
                    Slika="/Images/Biciklizam/6.jpg",
                    KolicinaNaStanju=5,
                   
                    Kategorija="biciklizam",
                     Karakteristike="Genesis",
                      Velicina="",
                    
                },
                new Product
                {
                    Ime="Nakamura CATCH JR 20, mtb bicikl",
                    Opis="Nakamura Catch 20 JR je odličan dječiji brdski bicikl s 20-inčnim točkovima. Bicikl ima aluminijski okvir te šest brzina. To je odličan izbor za djecu do 10 godina koji vole vožnju po šumskim i brdskim stazama.",
                    Cijena=30,
                    Slika="/Images/Biciklizam/7.jpg",
                    KolicinaNaStanju=12,
                    
                    Kategorija="biciklizam",
                    Karakteristike="Nakamura",
                     Velicina="",
                    
                },
                new Product
                {
                    Ime="Chillafish CHARLIE, guralica",
                    Opis="Chillafish Charlie je veoma lagani 10-inčni bicikl na guranje s EVA gumama koje su otporne na probijanje. ",
                    Cijena=25,
                    Slika="/Images/Biciklizam/8.jpg",
                    KolicinaNaStanju=12,
                  
                    Kategorija="biciklizam",
                    Karakteristike="Chillafish",
                     Velicina="",
                    
                },
                 new Product
                {
                    Ime="Uvex AIR WING, biciklistička kaciga,",
                    Opis="Uvex Air Wing je biciklistička kaciga koja je primjerena za cestovne i brdske bicikliste. ",
                    Slika="/Images/Biciklizam/9.jpg",
                    KolicinaNaStanju=20,
                    
                    Cijena=10,
                    Kategorija="biciklizam",
                    Karakteristike="",
                     Velicina="",
                    

                },
                new Product
                {
                    Ime="Uvex KID 3 CC, dječija biciklistička kaciga",
                    Opis="Kaciga Uvex Kid 3 CC ispunjava najviše bezbjednosne standarde i pruža odličnu fleksibilnost, namjenjena je za aktivnu djecu, koja vole da lutaju sa svojim biciklom.",
                    Cijena=15,
                    Slika="/Images/Biciklizam/10.jpg",
                    KolicinaNaStanju=15,
                   
                    Kategorija="biciklizam",
                    Karakteristike="Uvex",
                     Velicina="",
                  
                    
                },
                new Product
                {
                    Ime="Alpina PICO FLASH, dječija biciklistička kaciga",
                    Opis="Alpina Pico Flash je biciklistička kaciga za djecu i mlade. Ugrađeni vizir nudi zaštitu od sunčeve svjetlosti i daje dodatnu sigurnost u slučaju pada.",
                    Cijena=15,
                    Slika="/Images/Biciklizam/11.jpg",
                    KolicinaNaStanju=32,
               
                    Kategorija="biciklizam",
                    Karakteristike="Alpina",
                    Velicina="",
                    
                },
                new Product
                {
                    Ime="Alpina XIMO, dječija biciklistička kaciga",
                    Opis="Alpina Ximo je dječija biciklistička kaciga za mlade ljubitelje biciklizma. Kaciga je veoma prozračna, a istovremeno dizajnirana tako da sunčeve zrake ne dosežu glavu.Na prednjem dijelu ima i mrežicu za zaštitu od insekata.",
                    Cijena=10,
                    Slika="/Images/Biciklizam/12.jpg",
                    KolicinaNaStanju=25,
              
                    Kategorija="biciklizam",
                    Karakteristike="Alpina",
                     Velicina="",
                   
                    
                },
                new Product
                {
                    Ime="Camelbak PODIUM CHILL 0,71L, pvc bidon",
                    Opis="Camelbak Podium Chill je uvijek otvoren i također uvijek zatvoren zahvaljujući inovativno usniku Jet koji brine da bidon ne propušta vodu.",
                    Cijena=5,
                    Slika="/Images/Biciklizam/13.jpg",
                    KolicinaNaStanju=55,
                   
                    Kategorija="biciklizam",
                    Karakteristike="Camelbak",
                     Velicina="",
                    
                    
                },
                new Product
                {
                    Ime="Camelbak CHUTE MAG R 1L, pvc bidon,",
                    Opis="Boca ne preuzima miris i boju, zato u nju možete osim vode natočiti i druge napitke. Zbog širokog otvora je možete jednostavno napuniti ledom.",
                    Cijena=5,
                    Slika="/Images/Biciklizam/14.jpg",
                    KolicinaNaStanju=25,
                 
                    Kategorija="biciklizam",
                    Karakteristike="Camelbak",
                     Velicina="",
                    
                },
                new Product
                {
                    Ime="Nakamura IMPACT, naočale",
                    Opis="Nakamura Impact su sportske sunčane naočale koje su primjerene za bicikliste, trkače i druge sportaše. ",
                    Cijena=5,
                    Slika="/Images/Biciklizam/15.jpg",
                    KolicinaNaStanju=25,
                
                    Kategorija="biciklizam",
                    Karakteristike="Nakamura",
                     Velicina="",
                    
                    
                },
                new Product
                {
                    Ime="Nakamura IMPACT, naočale",
                    Opis="Nakamura Fusion su sportske sunčane naočale koje su primjerene za bicikliste, trkače i druge sportaše. Donji dio ručki i nosne kapice su gumene za bolje prianjanje. Naočale imaju 100% UV zaštitu.",
                    Cijena=5,
                    Slika="/Images/Biciklizam/16.jpg",
                    KolicinaNaStanju=25,
                   
                    Kategorija="biciklizam",
                    Karakteristike="Nakamura",
                     Velicina="",
                    
                },

                //e_biciklo
                 new Product
                {
                    Ime="Segway Ninebot Kickscooter E2 PRO električni trotinet",
                    Opis="Segway Ninebot Kickscooter E2 PRO električni trotinet će vam omogućiti da uživate u dometu i zabavnom iskustvu čiste radosti tokom svake vaše vožnje.",
                    Cijena=50,
                    KolicinaNaStanju=5,
                   
                    Karakteristike="Brend: Segway Ninebot Kickscooter E2 PRO \n"+
                    " Motor je u prednjem kotaču;"+
                    " Maksimalna brzina do 25 km/h;"+
                     "Nosivost do 100 kg;" +
                     "Vrijeme punjenja 3-4 sata;"+
                     "Maks. težina vozača: 100 kg;"+
                     "Neto težina: 18,8 kg;"+
                     "Maks. brzina: 25 km/h;"+
                     "Maks. domet: 35 km;"+
                     "Baterija: 275 Wh",
                     Kategorija="e_biciklo",
                      Velicina="",
                       Slika="/Images/E_biciklo/1.jpg",
                    
                },
                new Product
                {
                    Ime="Xiaomi Mi Electric Scooter Pro 2",
                    Opis="Mi Electric Scooter Pro 2 je vrhunski gradski električni trotinet. ",
                    Cijena=150,
                    KolicinaNaStanju=5,
                    Karakteristike="Brend: Xiaomi Mi Electric Scooter"+
                    "Nosivost: 120kg;"+ 
                    "Netto težina skutera; 28 kg;"+
                    "Brzina : 25km/h;"+
                    "Domet: do 60 km;"+
                    "Snaga motora: 400 W;"+
                    "Načini vožnje: Eco, Drive, Sport, Walk Mode;"+
                    "Maksimalna brzina: 25 km/h;"+
                    "Maksimalni domet: 55 km;"+
                    "Kapacitet baterije: 460 Wh;",
                    Slika="/Images/E_biciklo/2.jpg",
                    Kategorija="e_biciklo",
                     Velicina="",

                    
                },
                new Product
                {
                    Ime="Segway Ninebot KickScooter MAX G30E II, električni trotinet",
                    Opis="Segway Ninebot KickScooter MX G30E II je vrhunski gradski električni trotinet.",
                    Slika="/Images/E_biciklo/3.jpg",
                    Cijena=150,
                    KolicinaNaStanju=7,
                    Karakteristike="Brend: Segway Ninebot KickScooter"+
                    "Motor: Dva motora od 650 W (vršna snaga oba motora zajedno: 2200 W);"+
                    "Maksimalna brzina: 53 km/ h;"+
                    "Nosivost	120 kg"+
                    "Maksimalna brzina: 25 km/h;"+
                    "Maksimalan domet na jednom punjenju: Do 65 km (najviše u klasi!);"+
                    "Točkovi: 10-inčne pneumatske gume sa želatinoznom unutrašnjoom zaštitom;"+
                    "Savladavanje nagiba: Do 20%",
                    Kategorija="e_biciklo",
                     Velicina="",
                },
               
                new Product
                {
                    Ime="MS ENERGY eBike t100",
                    Opis="Idealan elektricni bicikl za gradsku voznju",
                    Slika="/Images/E_biciklo/4.jpg",
                    Cijena=150,
                    KolicinaNaStanju=5,
                    Karakteristike="Motor: Ananda M81 250W 80Nm,"+
                    "Baterija: 36V 15Ah Lithium battery, Punjač: AC 100V-230V smart charger;"+
                    "Domet: 120-130km;"+
                    "Maksimalna težina bicikliste: 130 kg;"+
                    "Brend: eBike",
                    Kategorija="e_biciklo",
                     Velicina="",
                    
                },
                new Product
                {
                    Ime="MS ENERGY eBike i10 black green",
                    Opis="Sklopivi električni bicikl novi je član MS Energy porodice čiji veliki 20” kotači čine vožnju ugodnom bez zaustavljanja na neravninama i preprekama uobičajenim na gradskim cestama.",
                    Slika="/Images/E_biciklo/5.jpg",
                    Cijena=150,
                    KolicinaNaStanju=5,
                    Karakteristike="Brend: eBike"+
                    "Dimenzije:	1900x700x1180 mm;"+"Težina: ≤ 25 kg;"+
                    "Maksimalna brzina: 25 km/h;"+
                    "Maksimalno opterećenje: ≤ 120kg;"+
                    "Potrošnja energije na 1000 km: 1.2 kW/h;"+
                    "Napon: 36 V",
                    Kategorija="e_biciklo",
                     Velicina="",
                },
                 new Product
                {
                    Ime="LIV ALLURE E+ GRAYISH BLUE 2022",
                    Opis="Liv Allure E+ je savršen e-bicikl za sve vozače koji traže elegantno riješenje za kretanje gradom.",
                    Slika="/Images/E_biciklo/6.jpg",
                    Cijena=250,
                    KolicinaNaStanju=10,
                    Karakteristike=" Brend: Giant"+
                    "Najveća brzina: 25 km/h;"+
                    "Baterija: 3 V;"+
                    "Domet: 60km - 100 km;"+
                    "Maksimalna težina bicikliste: 120 kg",
                    Kategorija="e_biciklo",
                     Velicina="",
                },
                new Product
                {
                    Ime="CUBE ELLA RIDE HYBRID 500 GREEN 'N'GREEN 2023 EASY ENTRY",
                    Opis="Cube Ella Ride Hybrid je idealno rjesenje za voznju gradom.",
                    Slika="/Images/E_biciklo/7.jpg",
                    Cijena=250,
                    KolicinaNaStanju=10,
                    Karakteristike="Brend: Cube"+
                    "Najveća brzina: 25 km/h;"+
                    "Domet: 60km - 100 km;"+
                    "Motor: 250 W Bafang motor;"+
                    "Maksimalna težina bicikliste: 120 kg",
                    Kategorija="e_biciklo",
                     Velicina="",
                },
                 new Product
                {
                    Ime="CUBE STEREO HYBRID 120 RACE 750 FIREORANGE'N'BLACK 2023",
                    Opis="Elegantan okvir Cube Stereo Hybrid-a savrsen je za uzivanje u laganoj gradskoj voznji.",
                    Slika="/Images/E_biciklo/8.jpg",
                    Cijena=300,
                    KolicinaNaStanju=10,
                    Karakteristike="Najveća brzina: 25 km/h;"+
                    "Domet: 60km - 100 km;"+
                    "Motor: 250 W Bafang motor;"+
                    "Maksimalna težina bicikliste: 120 kg",
                    Kategorija="e_biciklo",
                     Velicina="",
                },
                new Product
                {
                    Ime="Livall C20 zaštitna kaciga plava",
                    Opis="Livall C20 Helmet - zaštitna kaciga. Odlična za bicikle i električne romobile. ",
                    Slika="/Images/E_biciklo/9.jpg",
                    Cijena=30,
                    KolicinaNaStanju=30,
                    Karakteristike="Brend: Livall",
                    Kategorija="e_biciklo",
                     Velicina="",
                    
                },
                new Product
                {
                    Ime="Dunlop kaciga za bicikl",
                    Opis="Higijenska kaciga s uklonjivom i perivom unutarnjom oblogom ",
                    Slika="/Images/E_biciklo/10.jpg",
                    Cijena=20,
                    KolicinaNaStanju=30,
                    Karakteristike="Brend: Duplop",
                    Kategorija="e_biciklo",
                     Velicina="",
                    
                },

                //kajak
                 new Product
                 {
                    Ime="INTEX Challenger K1 Kayak",
                    Cijena=100,
                    Slika="/Images/Kajak/1.jpg",
                    Opis="",
                    KolicinaNaStanju=15,
                    Karakteristike="Dimenzije: 274 cm x 76 cm x 33 cm;"+
                    "Materijal: Vinyl debljine 0,75 mm;"+
                    "Predvidjen za jezera i mirne rijeke;"+
                    "Maksimalno opterećenje: 100 kg"+
                    "Broj osoba: 1",
                    Kategorija="kajak",
                     Velicina="",
            },
              new Product
            {
                Ime="INTEX Excursion Pro Kayak",
                Cijena=200,
                Slika="/Images/Kajak/2.jpg",
                Opis="Predvidjen za jezera i mirne rijeke.Podesiva sjedišta,posjeduje i podesiv držač za telefon i GoPro kameru.",
                KolicinaNaStanju=18,
                Karakteristike="Dimenzije 384x94x46cm"+
                "Broj osoba: 2",
                Kategorija="kajak",
                 Velicina="",

            },
              new Product
            {
                Ime="INTEX Explorer K2 Kayak",
                Cijena=200,
                Slika="/Images/Kajak/3.jpg",
                Opis="Kajak dvosjed sa veslom i pumpom..Nizak profil za jezera i blage rijeke. Podesivo sjedište na naduvavanje sa naslonom za leđa. Pod na naduvavanje za povećan komfor i čvrstinu. ",
                KolicinaNaStanju=5,
                Karakteristike="Dimenzije kajaka : 312 cm x 91 cm x 51 cm;"+
                "Broj osoba: 2",
                Kategorija="kajak",
                 Velicina="",
                
            },
              new Product
            {
                Ime="KAJAK BREEZE FULL TAHE NA NADUVAVANJE",
                Cijena=250,
                Slika="/Images/Kajak/4.jpg",
                Opis="Kajak namjenjen za mirne vode",
                KolicinaNaStanju=17,
                Karakteristike="Dužina: 485 cm;"+
                "Širina: 85 cm;"+
                "Težina: 19,9 kg;"+
                "Broj osoba: 3" ,
                Kategorija="kajak",
                 Velicina="",
               
            },
              new Product
            {
                Ime="KAJAK X100",
                Cijena=180,
                Slika="/Images/Kajak/5.jpg",
                Opis="Plovite mirnim vodama uz ovaj kajak na naduvavanje. Idealan za izlete od pola dana, uživaćete u vrhunskim plovnim performansama. Veličina naduvanog kajaka: dužina: 410 cm, sirina: 102 cm.",
                KolicinaNaStanju=5,
                Karakteristike="Veličina naduvanog kajaka: dužina: 410 cm, sirina: 102 cm"+
               "Broj osoba: 2",
               Kategorija="kajak",
                Velicina="",
            },
              new Product
            {
                Ime="VESLO ZA KAJAK 100 ",
                Cijena=20,
                Slika="/Images/Kajak/6.jpg",
                Opis="Veslajte duž obale, u jezeru ili mirnoj reci, pomoću ovog podesivog dvostrukog vesla! Lopatice pružaju čvrst otpor u vodi.",
                KolicinaNaStanju=50,
                Karakteristike="Dve prilagodljive veličine: 210-220cm i 225-235 cm",
                Kategorija="kajak",
                 Velicina="",
                
            },
              new Product
            {
                Ime="PRSLUK ZA SPASAVANJE LJ100N EASY",
                Cijena=20,
                Slika="/Images/Kajak/7.jpg",
                Opis="Prsluk je osmišljen da i deca mogu da uživaju u jedrenju. Lako se oblači, lagan je i udoban.",
                KolicinaNaStanju=30,
                Karakteristike="",
                Kategorija="kajak",
                 Velicina="",
               
            },
              new Product
            {
                Ime="PRSLUK ZA SPASAVANJE 50N",
                Cijena=30,
                Slika="/Images/Kajak/8.jpg",
                Opis="Prslug namjenjen za odrasle osobe,lako se oblači, lagan je i udoban.",
                KolicinaNaStanju=20,
                Karakteristike="",
                Kategorija="kajak",
                 Velicina="",
               
            },

            //kampovanje

            new Product
            {
                Ime="ŠATOR ZA DVIJE OSOBE 2 SEKUNDE",
                    Opis="Šator namjenjen za dvije odrasle osobe. Lako rasklapanje, samostojeći(lako se premešta).",
                    Cijena=80,
                    KolicinaNaStanju=10,
                    Karakteristike="Širina 130 cm, dubina 150 cm, visina 110 cm;"+
                    "Pruža zaštitu od sunca (UPF 50+);"+
                    "Može da izdrži vjetar od približno 30 km/h;"+
                    "Štiti od rosulje.",
                    Slika="/Images/Kampovanje/1.jpg",
                    Kategorija="kampovanje",
                     Velicina="",
                },
                 new Product
                {
                    Ime="ŠATOR MH100 FRESH & BLACK",
                    Opis="Šator za dvije osobe, koji se brzo i jednostavno postavlja.",
                    Slika="/Images/Kampovanje/2.jpg",
                    Cijena=120,
                    KolicinaNaStanju=5,
                    Karakteristike="Veličina:58 cm x 15 cm x 14 cm;"+
                    "Težina: 3 kg;"+
                    "Otporan na vetar do 40 km/h.",
                     Kategorija="kampovanje",
                      Velicina="",
                    

                },
                 new Product
                {
                    Ime="DNEVNI BORAVAK ZA KAMPOVANJE ARPENAZ BASE ",
                    Opis=" Udobno za najviše 6 osoba. Slobodnostojeća struktura jednostavna za postavljanje, otvori sa tri strane.",
                    Slika="/Images/Kampovanje/3.jpg",
                    Cijena=350,
                    KolicinaNaStanju=6,
                    Karakteristike="Visina: 2.15 m, površina: 6.25 m²"+
                    "Otporan na vetar do 50 km/h;"+
                    "Materijal filtrira UV zrake uz UPF 30",
                     Kategorija="kampovanje",
                      Velicina="",
                },
                 new Product
                {
                    Ime="ŠATOR ZA KAMPOVANJE MH100 2P",
                    Opis="Šator za dvije osobe, koji se brzo i jednostavno postavlja. ",
                    Slika="/Images/Kampovanje/4.jpg",
                    Cijena=150,
                    KolicinaNaStanju=3,
                    Karakteristike="Materijal sa UPF 30;"+
                    "Propušta sunčevu svetlost i filtrira dio UV zraka;"+
                    "Otporan na vetar do 40 km/h;"+
                    "Spavaonica: 130 x 210 cm;"+
                    "Maksimalna iskoristiva visina: 107 cm",
                     Kategorija="kampovanje",
                      Velicina="",
                },
                 new Product
                {
                    Ime="ŠATOR NA NADUVAVANJE AIR SECONDS 4,2 F&B ZA 4 OSOBE - 2 SPAVAONICE",
                    Opis="Šator Air Seconds 4.2 F&B na naduvavanje za četiri kampera koji žele odvojene sobe i prostrani dnevni boravak. ",
                    Slika="/Images/Kampovanje/5.jpg",
                    Cijena=250,
                    KolicinaNaStanju=7,
                    Karakteristike="Spavaće sobe: 140 x 260 cm, visoki boravak: 5,9 m² sa zatvarajućom podnicom"+
                    "Otporan na vetar do 60 km/h"+
                    "Smanjuje osjećaj toplote na jakom suncu",
                     Kategorija="kampovanje",
                      Velicina="",
                },
                 new Product
                {
                    Ime="VREĆA ZA SPAVANJE ARPENAZ ",
                    Opis=" ",
                    Slika="/Images/Kampovanje/6.jpg",
                    Cijena=30,
                    KolicinaNaStanju=20,
                    Karakteristike="Dimenzije: 190 x 72 cm, Rajsferšlus po celoj dužini"+
                    "Komforna temperatura 10 °C"+
                    "Granična temperatura: 5 °C",
                     Kategorija="kampovanje",
                      Velicina="",
                },
                 new Product
                {
                    Ime="DUŠEK NA NADUVAVANJE ULTIM COMFORT ",
                    Opis="Samonaduvavajući dušek Ultim Comfort za kampere koji žele udobnost svog doma.",
                    Slika="/Images/Kampovanje/7.jpg",
                    Cijena=70,
                    KolicinaNaStanju=25,
                    Karakteristike="Dimenzije: 200 x 70 x 8 cm",
                    Kategorija="kampovanje",
                     Velicina="",

                },
                 new Product
                {
                    Ime="VREĆA ZA SPAVANJE MT50 TREKING OD POLIESTERA ZA TEMPERATURE DO 15°C",
                    Opis="Vreću za spavanje kako biste mogli udobno da spavate i na temperaturama iznad 15 °C. Veoma udoban oblik mumije. 2 x 3/4 rajsferšlusa sa dvosmernim klizačem radi ventilacije. Spoljašnja površina materijala je tretirana tako da voda klizi sa nje.",
                    Slika="/Images/Kampovanje/8.jpg",
                    Cijena=50,
                    KolicinaNaStanju=32,
                    Karakteristike="",
                    Kategorija="kampovanje",
                     Velicina="",
                },
                new Product
                {
                    Ime="PLAVI UDOBNI JASTUK ZA KAMPOVANJE COMFORT",
                    Opis="Comfort jastuk da vam pruže savršenog saputnika za kampovanje.",
                    Slika="/Images/Kampovanje/9.jpg",
                    Cijena=15,
                    KolicinaNaStanju=25,
                    Karakteristike="Dimenzije: 45 x 30 x 13 cm;"+
                    "Udoban i mekan poliester",
                    Kategorija="kampovanje",
                     Velicina="",
                },
               
                new Product
                {
                    Ime="MREŽA PROTIV KOMARACA ZA 2 OSOBE",
                    Opis="Kompaktna mreža za putovanje pogodna je za dve osobe i omogućava da spavate bez brige. ",
                    Slika="/Images/Kampovanje/10.jpg",
                    Cijena=10,
                    KolicinaNaStanju=15,
                     Karakteristike="Gusto tkan materijal: 40 rupica/cm²",
                     Kategorija="kampovanje",
                      Velicina="",
                },
                new Product
                {
                    Ime="MREŽA PROTIV KOMARACA FORCLAZ (ZA 1 OSOBU)",
                    Opis="Kompaktna mreža za putovanje pogodna je za jednu osobu i omogućava da spavate bez brige.",
                    Slika="/Images/Kampovanje/11.jpg",
                    Cijena=7,
                    KolicinaNaStanju=19,
                    Karakteristike="Gusto tkan materijal: 40 rupica/cm²",
                    Kategorija="kampovanje",
                     Velicina="",
                },
                 new Product
                {
                    Ime="PODNA PROSTIRKA ZA ŠATOR MT900",
                    Opis="Lak i izdržljiv poliamid od 40 dena",
                    Slika="/Images/Kampovanje/12.jpg",
                    Cijena=15,
                    KolicinaNaStanju=25,
                    Karakteristike="",
                    Kategorija="kampovanje",
                     Velicina="",
                },

                //kvadovi
                 new Product
                {
                    Ime="CFORCE 1000 EPS",
                    Slika="/Images/Kvadovi/1.jpg",
                    Opis="Vozilo za prave ljubitelje uzbudljive avanture! ",
                    Cijena=80,
                    KolicinaNaStanju=3,
                    Karakteristike="DUŽINA x ŠIRINA x VISINA: 2310 x 1264 x 1420mm;"+
                    "MEĐUOSOVINSKO RASTOJANJE: 1480mm;"+
                    "MINIMALNO RASTOJANJE OD PODLOGE: 285mm;"+
                    "MINIMALNI RADIJUS OKRETANJA: 7.6m;"+
                    "TEŽINA VOZILA: 447kg"+
                    "ZAPREMINA REZERVOARA: 30L"+
                    "Tip=ATV",
                    Kategorija="kvadovi",
                     Velicina="",
                    
                },
                new Product
                {
                    Ime="CFORCE 850XC EPS",
                    Slika="/Images/Kvadovi/2.jpg",
                    Opis="Istražite prirodu i izazovite sebe na vožnju koja ostavlja bez daha! ",
                    Cijena=50,
                    KolicinaNaStanju=5,
                    Karakteristike="DUŽINA X ŠIRINA X VISINA: 2310 X 1250 X 1420mm;"+
                    "MEĐUOSOVINSKO RASTOJANJE: 1480MM;"+
                    "MINIMALNO RASTOJANJE OD PODLOGE: 285MM;"+
                    "MINIMALNI RADIJUS OKRETANJA: 7.6M;"+
                    "TEŽINA VOZILA: 447KG;"+
                    "ZAPREMINA REZERVOARA: 30L"+
                    "Tip=ATV",
                    Kategorija="kvadovi",
                     Velicina="",

                   
                },
                new Product
                {
                    Ime="CFORCE 110",
                    Slika="/Images/Kvadovi/3.jpg",
                    Opis="CFORCE 110 je prvi ATV za djecu svih uzrasta sa fantastičnim tehničkim karakteristikama i dizajnom koji je uvijek za korak ispred.",
                    Cijena=50,
                    KolicinaNaStanju=5,
                    Karakteristike="DUŽINA X ŠIRINA X VISINA: 1483 X 943 X 925 MM;"+
                    "MEĐUOSOVINSKO RASTOJANJE: 1200MM;"+
                    "MINIMALNO RASTOJANJE OD PODLOGE: 110MM;"+
                    "MINIMALNI RADIJUS OKRETANJA;"+
                    "TEŽINA VOZILA: 120KG;"+
                    "NOSIVOST: 50KG"+
                    "ZAPREMINA REZERVOARA: 6.4L"+
                    "Tip=ATV",
                    Kategorija="kvadovi",
                     Velicina="",
                    
                },
                new Product
                {
                    Ime="CFORCE X5",
                    Slika="/Images/Kvadovi/4.jpg",
                    Opis="Kompaktno, čvrsto i sigurno vozilo CFORCE X4 koje u sebi nosi čistokrvni DNK porodice CFMOTO CFORCE porodice. ",
                    Cijena=100,
                    KolicinaNaStanju=4,
                    Karakteristike="DUŽINA X ŠIRINA X VISINA: 2386 X 1125 X 1217 MM;"+
                    "MEĐUOSOVINSKO RASTOJANJE: 1460MM;"+
                    "MINIMALNO RASTOJANJE OD PODLOGE: 262MM;"+
                    "MINIMALNI RADIJUS OKRETANJA;"+
                    "TEŽINA VOZILA: 365KG;"+
                    "NOSIVOST:240KG;"+
                    "ZAPREMINA REZERVOARA: 17L."+
                    "Tip=ATV",
                    Kategorija="kvadovi",
                     Velicina="",
                    
                },
                new Product
                {
                    Ime="CFORCE 625 OVERLAND",
                    Slika="/Images/Kvadovi/5.jpg",
                    Opis="Istražite prirodu i izazovite sebe na vožnju koja ostavlja bez daha!",
                    Cijena=80,
                    KolicinaNaStanju=5,
                    Karakteristike="DUŽINA X ŠIRINA X VISINA: 2235 X 1180 X 1390MM;"+
                    "MEĐUOSOVINSKO RASTOJANJE: 1480MM;"+
                    "MINIMALNO RASTOJANJE OD PODLOGE: 270MM;"+
                    "MINIMALNI RADIJUS OKRETANJA: 7.4M;"+
                    "TEŽINA VOZILA: 395KG;"+
                    "ZAPREMINA REZERVOARA: 18L;"+
                    "Tip=ATV",
                    Kategorija="kvadovi",
                     Velicina="",
                   
                },
                new Product
                {
                    Ime="UFORCE 1000XL EPS",
                    Slika="/Images/Kvadovi/6.jpg",
                    Opis="Kompaktno, čvrsto i sigurno vozilo od 6 sjedišta sa sigurnosnim pojasevima.",
                    Cijena=150,
                    KolicinaNaStanju=5,
                    Karakteristike="DUŽINA X ŠIRINA X VISINA: 3770 X 1615 X 1850 MM;"+
                    "MEĐUOSOVINSKO RASTOJANJE: 2850MM;"+
                    "MINIMALNO RASTOJANJE OD PODLOGE: 310MM;"+
                    "DOZVOLJENA NOSIVOST: 800KG;"+
                    "TEŽINA VOZILA: 820KG;"+
                    "ZAPREMINA REZERVOARA: 40L"+
                    "Tip=UTV",
                    Kategorija="kvadovi",
                     Velicina="",
                   
                },
                new Product
                {
                    Ime="450MT",
                    Slika="/Images/Kvadovi/7.jpg",
                    Opis=" Model 450MT je visoko sposobno terensko vozilo, lako za vožnju. Čvrste konstrukcije i snažnim agregatom uz savremenu tehniku pruža sve potrebno za terensku vožnju, daleko od ugaženih puteva.",
                    Cijena=40,
                    KolicinaNaStanju=8,
                    Karakteristike="DUŽINA X ŠIRINA X VISINA: 2210 X 870 X 1380-1430;"+
                    "MEĐUOSOVINSKO RASTOJANJE: 1505 MM;"+
                    "MINIMALNO RASTOJANJE OD PODLOGE: 220MM;"
                    +"VISINA SEDIŠTA: 820MM;"+
                    "TEŽINA VOZILA: 175KG;"+
                    "ZAPREMINA REZERVOARA: 17.5L"+
                    "Tip=MOTOCIKL",
                    Kategorija="kvadovi",
                     Velicina="",
                    
                },
                new Product
                {
                    Ime="CL-X 700 ABS",
                    Slika="/Images/Kvadovi/8.jpg",
                    Opis="Istražite prirodu i izazovite sebe na vožnju koja ostavlja bez daha!",
                    Cijena=60,
                    KolicinaNaStanju=7,
                    Karakteristike="DUŽINA X ŠIRINA X VISINA: 2107 X 887 X 1200MM;"+
                    "MEĐUOSOVINSKO RASTOJANJE: 1435MM;"+
                    "MINIMALNO RASTOJANJE OD PODLOGE: 160MM;"+
                    "MINIMALNI RADIJUS OKRETANJA;"+
                    "TEŽINA VOZILA: 196KG;"+
                    "ZAPREMINA REZERVOARA: 13L"+
                    "Tip=MOTOCIKL",
                    Kategorija="kvadovi",
                     Velicina="",
                   
                },

                //planinarenje

                 new Product
                {
                    Ime="Jednodnevni ruksak za penjanje",
                    Opis="BUG ruksak je dizajniran za jednodnevne rute (više dužinsko penjanje). ",
                    Slika="/Images/Planinarenje/1.jpg",
                    KolicinaNaStanju=12,
                    Cijena=20,
                    Karakteristike="Zapremina 18l;"+
                    "Težina: 525g.",
                    Kategorija="planinarenje",
                     Velicina="",
                
                },
                new Product
                {
                    Ime="Sportski hiking ruksak",
                    Opis="Sportski hiking ruksak sa izvrsnom leđnom ventilacijom.",
                    Slika="/Images/Planinarenje/2.jpg",
                    KolicinaNaStanju=15,
                    Cijena=30,
                    Karakteristike="Težina: 1150 g;"+
                    "Zapremina: 30l;"+
                    "Dimenzije: 57 x 30 x 25 cm;"+
                    "Nosivost ruksaka: 3 - 8 kg",
                    Kategorija="planinarenje",
                     Velicina="",
                },
                new Product
                {
                    Ime="Vodonepropusne bisage, navary",
                    Opis="Vodonepropusni torba",
                    Slika="/Images/Planinarenje/3.jpg",
                    KolicinaNaStanju=5,
                    Cijena=25,
                    Karakteristike="Dimenzija: 37 x 33 x 19 cm;"+
                    "Zapremina: 48l;"+
                    "Težina: 1940g;"+
                    "Nosivost: 25kg",
                    Kategorija="planinarenje",
                     Velicina="",
                },
                new Product
                {
                    Ime="TOUR 25 ruksak",
                    Opis="S brojnim lako dostupnim džepovima, TOUR25 je dizajniran za skijaše koji traže udoban, lagan i praktičan ruksak za svaku avanturu u planinama.",
                    Slika="/Images/Planinarenje/4.jpg",
                    KolicinaNaStanju=21,
                    Cijena=50,
                    Karakteristike="TEŽINA: 760 grama",
                    Kategorija="planinarenje",
                     Velicina="",
                },
                new Product
                {
                    Ime="Pojas za penjanje i planinarenje",
                    Opis="Pojas dizajniran za tehničko planinarenje, sportsko penjanje i penjanje višedužinskih smjerova. Uz podesive omče za noge, kroj se može prilagoditi svim penjačima. ",
                    Slika="/Images/Planinarenje/5.jpg",
                    KolicinaNaStanju=25,
                    Karakteristike="Velicina: M, L, XL ",
                    Cijena=15,
                    Kategorija="planinarenje",
                     Velicina="",

                },
                new Product
                {
                    Ime="Pojas za canyoning",
                    Opis="Udoban, ergonomičan pojas s integriranom zaštitnom za canyoning dizajniran za naprednije korisnike i vodiče.",
                    Slika="/Images/Planinarenje/6.jpg",
                    KolicinaNaStanju=15,
                    Karakteristike="Velicina: UNV",
                    Cijena=25,
                    Kategorija="planinarenje",
                     Velicina="",
                },
                new Product
                {
                    Ime="Penjački pojas",
                    Opis="Petzl kompletan pojas za odrasle. Za sve one koji preferiraju kompletan pojas za zaštitu od pada. Za sve tipove rekreativnih aktivnosti.",
                    Slika="/Images/Planinarenje/7.jpg",
                    KolicinaNaStanju=5,
                    Karakteristike="Velicina: XS, XL, M ,XXL",
                    Cijena=20,
                    Kategorija="planinarenje",
                     Velicina="",
                },
                new Product
                {
                    Ime="Kaciga za penjanje",
                    Opis="Izuzetno lagana, vrlo udobna i potpuno prozračna penjačka kaciga. Zahvaljujući udobnosti i laganoj konstrukciji, idealna je za upotrebu u sportskom penjanju, planinarenju ili ferati.",
                    Slika="/Images/Planinarenje/8.jpg",
                    KolicinaNaStanju=25,
                    Karakteristike="Velicina 51-60cm",
                    Cijena=30,
                    Kategorija="planinarenje",
                     Velicina="",
                },
                new Product
                {
                    Ime="ultra-lagana penjačka kaciga",
                    Opis="Izuzetno lagana kaciga za ambiciozne penjače i planinare. Kaciga je dizajnirana kako bi vam pružila izuzetni omjer težine i zaštite (170 g).",
                    Slika="/Images/Planinarenje/9.jpg",
                    KolicinaNaStanju=16,
                    Karakteristike="Velicina 51-60cm",
                    Cijena=12,
                    Kategorija="planinarenje",
                     Velicina="",
                    
                },


                //skijanje

                new Product
                {
                    Ime="Atomic REDSTER TI + M 12 GW, set all round skija",
                    Opis="Atomic Redster Ti su odlične skije u seriji Redster X koje osiguravaju savršen nadzor pri svim brzinama.",
                    Slika="/Images/Skijanje/1.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="161cm, 165cm, 175cm",
                    Karakteristike="Brend: Atomic",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="McKinley FLYTE 7, set all round skija",
                    Opis="McKinley Flyte 7 su moderne skije za rekreativno skijanje, koje su namjenjene za oba pola. Njihov dizajn omogućava efikasno skijanje na uređenim stazama.",
                    Slika="/Images/Skijanje/2.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="152cm, 160cm, 168cm",
                    Karakteristike="Brend: McKinley",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="McKinley S9 TI, set ženski all round skija",
                    Opis="McKinley S9 Ti su super sportske skije za bolje rekreativne skijaše koji traže skije koje ih neće iznejveriti.",
                    Slika="/Images/Skijanje/3.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="146cm, 152cm, 158cm",
                    Karakteristike="Brend: McKinley",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Elan PRIMETIME 22 SPORT PS + EL 10.0 GW, set all round skija",
                    Opis="Elan Primetime 22 Sport Power Shift nudi pouzdane i agilne performanse. Omogućuju jednostavno kretanje i cjelodnevno uživanje na skijaškim stazama.",
                    Slika="/Images/Skijanje/4.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="158cm, 165cm, 172cm",
                    Karakteristike="Brend: Elan",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Nordica THE CRUISE S W, ženske pancerice",
                    Opis=" Dizajnirane za početnice i rekreativke, pružaju svu potrebnu udobnost koja će povećati vaš napredak i učiniti vaše uspomene na skijanju samo najboljima.",
                    Slika="/Images/Skijanje/5.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="235cm, 245cm, 255cm, 265cm, 275cm",
                    Karakteristike="Brend: Nortica",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Head RAPTOR 60, dječije pancerice",
                    Opis="Head Raptor 60 su dječije skijaške pancerice koje dizajnom i grafički podsjećaju na takmičarsku liniju Head skijaških pancerica. ",
                    Slika="/Images/Skijanje/6.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="235cm, 245cm, 255cm, 265cm",
                    Karakteristike="Brend: Head",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Head EDGE LYT 75X W HV GW, ženske pancerice",
                    Opis="Head Edge Lyt 75X W su ženske skijaške pancerice koje su primjerene za rekreativne skijašice koje uživaju u zareznoj tehnici, kao i u skijanju izvan uređenih skijališta.",
                    Slika="/Images/Skijanje/7.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="245cm, 255cm, 265cm, 275cm",
                    Karakteristike="Brend: Head",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Head EDGE LYT 90 X HV GW, muške pancerice",
                    Opis="Head Edge Lyt 90X su muške skijaške pancerice koje su primjerene za rekreativne skijaše koje uživaju u zareznoj tehnici, kao i u skijanju izvan uređenih skijališta. ",
                    Slika="/Images/Skijanje/8.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="265cm, 275cm, 285cm, 295cm",
                    Karakteristike="Brend: Head",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Alpina ZUPO JR, dječija ski kaciga",
                    Opis="Alpina Zupo je dječija skijaška kaciga koja je tvrda izvana, a vrlo mekana iznutra. Kaciga ima tvrdu školjku koja pruža maksimalnu zaštitu u slučaju sudara.",
                    Slika="/Images/Skijanje/9.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="51-55cm",
                    Karakteristike="Brend: Alpina",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Alpina ARBER VISOR Q-LITE, skijaška kaciga",
                    Opis="Alpina Arber Visor Q-Lite je nova skijaška kaciga sa vizirom, s provjerenim Alpina prilagođavanje. Kaciga se odlikuje kvalitetnim karakteristikama kao što su Inmold tehnologije izrade do izvrsnog prozračivanja kroz zračne kanale. ",
                    Slika="/Images/Skijanje/10.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="54-58cm",
                    Karakteristike="Brend: Alpina",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Bolle JULIET, kaciga ženska skijaška",
                    Opis="Bolle Juliet je ženska kaciga za skijanje, koja je izuzetno otporna na udarce, a istovremeno ima veoma elegantan i ženstven oblik.",
                    Slika="/Images/Skijanje/11.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="54-58cm",
                    Karakteristike="Brend: Bolle",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Bolle INUK, dječije skijaške naočale",
                    Opis="Bolle Inuk su veoma funkcionalne dječije naočale, lijepo se prilagođavaju svim vrstama kaciga, a osim toga obezbjeđuju dobar pogled jer ne magle",
                    Slika="/Images/Skijanje/12.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="Univerzalna",
                    Karakteristike="Brend: Bolle",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Bolle BEDROCK, skijaške naočale",
                    Opis="Naočale su pogodne za srednja i veća lica i zahvaljujući dvostrukom materijalu osiguravaju odlično pristajanje i udobnost.",
                    Slika="/Images/Skijanje/13.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="Univezalna",
                    Karakteristike="Brend: Bolle",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Bolle BEDROCK, skijaške naočale",
                    Opis="Naočale su pogodne za srednja i veća lica i zahvaljujući dvostrukom materijalu osiguravaju odlično pristajanje i udobnost.",
                    Slika="/Images/Skijanje/14.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="Univezalna",
                    Karakteristike="Brend: Bolle",
                    Kategorija="skijanje",
                },
                
                new Product
                {
                    Ime="Elan HOTROD, skijaški štapovi",
                    Opis="Izrađeni su od izdržljivog i laganog aluminija te će vam dugo služiti. Imaju ergonomske ručke i kajš, tako da ćete udobno skijati cijeli dan.",
                    Slika="/Images/Skijanje/15.png",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="115cm, 120cm, 125cm, 130cm, 135cm",
                    Karakteristike="Brend: Elan",
                    Kategorija="skijanje",
                },
                new Product
                {
                    Ime="Elan HOTROD W, ženski ski štapovi",
                    Opis="Izrađeni su od izdržljivog i laganog aluminija te će vam dugo služiti. Imaju ergonomske ručke i kajš, tako da ćete udobno skijati cijeli dan.",
                    Slika="/Images/Skijanje/16.jpg",
                    Cijena=3,
                    KolicinaNaStanju=3,
                    Velicina="115cm, 120cm, 125cm",
                    Karakteristike="Brend: Elan",
                    Kategorija="skijanje",
            },
        };
        foreach(var product in oprema )
        {
            context.Oprema.Add(product);
        }
        context.SaveChanges();

    }
    }
}