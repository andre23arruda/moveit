import { useContext } from 'react'
import { ChallengesContext } from '../../contexts/ChallengesContext'
import styles from './styles.module.scss'

export default function LevelUpModal() {
    const { experienceData, showLevelUp, setShowLevelUp } = useContext(ChallengesContext)

    if (showLevelUp) {
        return (
            <div className={ styles.overlay }>
                <div className={ styles.container }>
                    <header>{ experienceData.level }</header>

                    <strong>Parabéns</strong>

                    <p>Você alcançou um novo nível!</p>

                    <button
                        type="button"
                        onClick={() => setShowLevelUp(false)}
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
