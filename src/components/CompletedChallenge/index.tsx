import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengesContext'
import styles from './styles.module.scss'

export default function CompletedChallenge() {
    const { experienceData } = useContext(ChallengesContext)

    return (
        <div className={ styles.container }>
            <span>Desafios completos</span>
            <span>{ experienceData.completedChallenges }</span>
        </div>
    )
}
