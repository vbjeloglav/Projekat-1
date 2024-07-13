import { Box, Typography } from '@mui/material';
import { url } from 'inspector';
import Slider from 'react-slick';

   /* const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
      };*/



      const slides = [
        {
            url:'Images/pozadina/OIP.jpg',
         
          text: 'Tekst za sliku 1',
        },
       /* {
          imgSrc: 'Images/Pozadina/biciklizam-home.jpg',
          text: 'Tekst za sliku 2',
        },*/
        // Dodajte više slajdova po potrebi
      ];
      
      const Slide = ({ url, text }: { url: string; text: string }) => (
        <div className="slide">
          <img src={url} alt="slide" />
          <div className="slide-text">{text}</div>
        </div>
      );
      
      const HomePage = () => {
        const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        };
    return(
       /* <>
        <Slider {...settings}>
           
           
            <div>
                <img src='/Images/sportovi/kvadovi.jpg' alt='hero' style={{display:'block', width:'100%', maxHeight:500}}/>
                
            </div>

            <div>
        <img src='/Images/sportovi/kvadovi.jpg' alt="slide1" />
        <div className="slide-text">
          <h3>Naslov teksta 1</h3>
          <p>Ovdje ide vaš tekst ili opis slike.</p>
        </div>
      </div>
        </Slider>

        <Box display='flex' justifyContent='center' sx={{p:4}}>
            <Typography variant='h1'>
                dobro dosli
            </Typography>
        </Box>
        </>*/

        <Slider {...settings}>
        {slides.map((slide, index) => (
          <Slide key={index} url={slide.url} text={slide.text} />
        ))}
      </Slider>
    )
}
export default HomePage;
