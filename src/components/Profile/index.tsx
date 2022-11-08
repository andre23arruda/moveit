import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengesContext'
import styles from './styles.module.scss'

export default function Profile() {
    const router = useRouter()
    const { experienceData, userData, setShowLogout } = useContext(ChallengesContext)

    return (
        <div className={ styles.container }>
            <img
                className={ styles.profileImage }
                src={ userData.avatar }
                alt={ userData.name }
            />

            <div>
                <strong>{ userData.name }</strong>

                <p>
                    <img src="/images/up.svg" alt="Level" />
                    Level { experienceData.level }
                </p>
            </div>

            <button
                className={ styles.logoutButton }
                onClick={() => setShowLogout(true)}
                title="Sair"
            >
                <img src="/images/logout.svg" alt="Logout" />
            </button>

        </div>
    )
}
