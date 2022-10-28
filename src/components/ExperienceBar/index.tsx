import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengesContext'

import styles from './styles.module.scss'

export default function ExperienceBar() {
    const { experienceData, experienceToNextLevel } = useContext(ChallengesContext)
    const experiecencePercentage = 100 * experienceData.experience / experienceToNextLevel

    return (
        <header className={ styles.experienceBar }>
            <span>0xp</span>

            <div className={ styles.barContainer }>
                <div
                    className={ styles.fillBar }
                    style={{ width: `${ experiecencePercentage }%`}}
                />

                <span
                    className={ styles.currentExperience }
                    style={{ left: `${ experiecencePercentage }%`}}
                >
                    { experienceData.experience }xp
                </span>
            </div>

            <span>
                { experienceToNextLevel }xp
            </span>
        </header>
    )
}
