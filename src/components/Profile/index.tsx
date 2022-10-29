import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengesContext'
import styles from './styles.module.scss'

export default function Profile() {
    const router = useRouter()
    const { experienceData, userData } = useContext(ChallengesContext)

    function logout() {
        Cookies.remove('experienceData')
        Cookies.remove('userData')
        router.push('/login')
    }

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
                onClick={ logout }
            >
                <img src="/images/logout.svg" alt="Logout" />
            </button>

        </div>
    )
}
