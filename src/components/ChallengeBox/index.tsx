import { useContext } from 'react'

import { ChallengesContext } from '../../contexts/ChallengesContext'
import { CountdownContext } from '../../contexts/CountdownContext'

import styles from './styles.module.scss'

export default function ChallengeBox() {
    const { activeChallenge, completeChallenge, resetChallenge } = useContext(ChallengesContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleComplete() {
        completeChallenge()
        resetCountdown()
    }

    function handleFailed() {
        resetChallenge()
        resetCountdown()
    }

    if (activeChallenge) {
        return (
            <div className={`${ styles.box } ${ styles.boxActive }`}>
                <strong className={ styles.xp }>Ganhe { activeChallenge.amount } xp</strong>

                <div className={ styles.exerciseContainer }>
                    <img src={`/images/${ activeChallenge.type }.svg`} alt="Exercise" />

                    <strong>Novo desafio</strong>

                    <p>{ activeChallenge.description }</p>
                </div>

                <div className={ styles.buttonsContainer }>
                    <button
                        className={ styles.red }
                        onClick={ handleFailed }
                    >
                        Falhei
                    </button>

                    <button
                        className={ styles.green }
                        onClick={ handleComplete }
                    >
                        Completei
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={ styles.box }>
            <strong>Finalize um ciclo para receber desafios</strong>

                <img src="/images/levelup.svg" alt="Level Up" />

                <p>
                    Avance de level completando os desafios.
                </p>
        </div>
    )
}
