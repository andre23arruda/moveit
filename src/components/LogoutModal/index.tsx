import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengesContext'
import styles from './styles.module.scss'

export default function LogoutModal() {
    const router = useRouter()
    const { showLogout, setShowLogout } = useContext(ChallengesContext)

    function logout() {
        Cookies.remove('experienceData')
        Cookies.remove('userData')
        router.push('/login')
    }

    if (showLogout) {
        return (
            <div className={ styles.overlay }>
                <div className={ styles.container }>
                    <header />

                    <strong>Deseja sair?</strong>

                    <p>Se sair, perderá toda a experiência adquirida</p>

                    <div className={ styles.buttonsContainer }>
                        <button
                            onClick={() => setShowLogout(false)}
                        >
                            Cancelar
                        </button>

                        <button
                            className={ styles.red }
                            onClick={ logout }
                        >
                            Sim, quero sair
                        </button>
                    </div>

                    <button
                        className={ styles.close }
                        type="button"
                        onClick={() => setShowLogout(false)}
                    >
                        <img
                            src="/images/close.svg"
                            alt="Fechar modal"
                        />
                    </button>
                </div>
            </div>
        )
    }

    return null
}
