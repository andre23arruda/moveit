import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Cookies from 'js-cookie'
import styles from './styles.module.scss'

export default function Login() {
    const router = useRouter()
    const [username, setUsername] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        fetch(`https://api.github.com/users/${ username }`)
        .then(response => {
            // console.log(response)
            if (response.ok) {
                response.json()
                .then(data => {
                    Cookies.set(
                        'experienceData',
                        JSON.stringify({
                            experience: 0,
                            level: 1,
                            completedChallenges: 0
                        })
                    )
                    Cookies.set(
                        'userData',
                        JSON.stringify({
                            avatar: data.avatar_url,
                            name: data.name || data.login
                        })
                    )
                    router.push('/')
                })
            } else {
                alert('Usuário não existe!')
            }
        })
    }

    return (
        <div className={ styles.container }>
            <Head>
                <title>Login | Move.it</title>
            </Head>

            <section>
                <img src="/images/login_background.svg" alt="Move.it background" />

                <form onSubmit={ event => handleSubmit(event) }>
                    <img src="/images/logo_white.svg" alt="Logo" />

                    <h2>Bem vindo</h2>

                    <p>
                        <img src="images/github.svg" alt="Github icon" />
                        Faça login com seu Github para começar
                    </p>

                    <div className={ styles.inputContainer }>
                        <input
                            type="text"
                            placeholder="Digite seu username"
                            value={ username }
                            onChange={ event => setUsername(event.target.value) }
                        />

                        <button>
                            <img src="/images/arrow.svg" alt="Arrow" />
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}
