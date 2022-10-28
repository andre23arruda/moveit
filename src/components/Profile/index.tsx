import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengesContext'
import styles from './styles.module.scss'

export default function Profile() {
    const { experienceData } = useContext(ChallengesContext)
    return (
        <div className={ styles.container }>
            <img
                className={ styles.profileImage }
                src="https://avatars.githubusercontent.com/u/33252657?s=96&v=4"
                alt="André Arruda"
            />

            <div>
                <strong>André Arruda</strong>

                <p>
                    <img src="/images/up.svg" alt="Level" />
                    Level { experienceData.level }
                </p>
            </div>
        </div>
    )
}
