import { createUser, logIn, change } from './config/firebase.js'

const form_registration = document.getElementById('form-registration')
const form_login = document.getElementById('form-login')

document.addEventListener('DOMContentLoaded', () => {
 change()
})

if (form_registration !== null) {
  form_registration.addEventListener('submit', async e => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const { error, data } = await createUser(email, password)

    if (error) {
      switch (data.code) {
        case 'auth/email-already-in-use':
          alert('Correo registrado')
          break
        case 'auth/weak-password':
          alert('Contraseña debe ser de mínimo 6 caracteres')
          break
        default:
          alert('ERROR')
          break
      }
    } else {
      alert('Usuaro registrado correctamente')
      window.location.href = '/frontend/login.html'
    }
  })
}

if (form_login !== null) {
  form_login.addEventListener('submit', async e => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const { error, data } = await logIn(email, password)

    if (error) {
      switch (data.code) {
        case 'auth/wrong-password':
          alert('Contraseña incorrecta')
          break
        case 'auth/user-not-found':
          alert('Correo no registrado')
          break
        default:
          alert('ERROR')
          break
      }
    } else {
      localStorage.setItem(
        'user',
        JSON.stringify({ email: data.email, uid: data.uid })
      )
      window.location.href = '/frontend/home.html'
    }
  })
}