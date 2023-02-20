import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { clientAuth } from '../../firebase'

const SocialLogin = () => {
  const socialLogin = async (event) => {
    const {
      target: { name },
    } = event
    let provider
    if (name === 'github') {
      provider = new GithubAuthProvider()
    } else if (name === 'google') {
      provider = new GoogleAuthProvider()
    }
    const data = await signInWithPopup(clientAuth, provider)
    console.log(data)
  }

  return (
    <div>
      <button onClick={socialLogin} name="github">
        Continue with github
      </button>
      <button onClick={socialLogin} name="google">
        Continue with google
      </button>
    </div>
  )
}

export default SocialLogin
