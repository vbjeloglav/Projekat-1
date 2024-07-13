import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';

 
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
 const navigate = useNavigate();
    const {register, handleSubmit, setError, formState: {isSubmitting, errors,isValid}}=useForm({
        mode:'onTouched'
    })
   
function handleApiErrors(errors:any){
 if(errors){
  errors.forEach((error:string) => {
    if(error.includes('Password')){
      setError('password', {message:error})
    }
    else if(error.includes('Email')){
      setError('email', {message:error})
    }else if(error.includes('Username')){
      setError('username', {message:error})
    }
    
  });
 }
}

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={Paper} maxWidth="sm" sx={{display: 'flex', flexDirection:'column', alignItems:'center', p:4}} >
       
       
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Registruj se
          </Typography>
          <Box component="form"
           onSubmit={handleSubmit(data => agent.Account.register(data)
            .then(()=>{
              toast.success('Uspjesno ste se registrovali -sada se mozete prijaviti');
              navigate('/prijava');
            })
            .catch(error=>handleApiErrors(error)))} 
           noValidate sx={{ mt: 1 }}>
           
           <TextField
              margin="normal"
              fullWidth
              label="Korisnicko ime"
              
              autoFocus
              {...register('korisnicko_ime', {required:'Korisnicko ime je obavezno!'})}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />
             <TextField
              margin="normal"
              fullWidth
              label="Email"
              {...register('email', {required:'Email je obavezan!',
                pattern:{
                  value:/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                  message:'Nije vazeca e-mail adresa!'
                }
              })}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
            <TextField
              margin="normal"
              fullWidth
             
              label="Lozinka"
              type="lozinka"
              {...register('lozinka', {required:'Lozinka ne moze biti prazna!',
                pattern:{
                  value:/(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                  message: 'Lozinka ne ispunjava zahtjev za slozenost'

                 }})}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
             
           
           
            <LoadingButton loading={isSubmitting}
            disabled={!isValid}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Registruj se
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to='/prijava' 
                style={{textDecoration:'none'}}>
                  {"Vec imate nalog? Prijavi se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
       
      </Container>
    </ThemeProvider>
  );
}