import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function GoogleAuth({setAuth}) {

  return (
    <GoogleOAuthProvider clientId="562544747095-omd12noc7oh37d9nhsaie5hoffjphnut.apps.googleusercontent.com">
        <GoogleLogin
        onSuccess={credentialResponse => {
          const decode = jwtDecode(credentialResponse?.credential)
          setAuth({name: decode.name, email: decode.email, sub: decode.sub})
        }}
        onError={() => {
            console.log('Login Failed');
        }}
        useOneTap
        />
    </GoogleOAuthProvider>
  )
}
