import { useContext } from 'react'
import { CountdownContext } from '../../contexts/CountdownContext'
import styles from './styles.module.scss'

export default function Countdown() {
    const { hasFinished, isActive, minutes, resetCountdown, seconds, startCountdown } = useContext(CountdownContext)

    const [minute1, minute2] = String(minutes).padStart(2, '0'). split('')
    const [second1, second2] = String(seconds).padStart(2, '0'). split('')

    return (
        <div>
            <div className={ styles.container }>
                <div>
                    <span>{ minute1 }</span>
                    <span>{ minute2 }</span>
                </div>

                <span>:</span>

                <div>
                    <span>{ second1 }</span>
                    <span>{ second2 }</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                    className={ styles.button }
                    disabled
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button
                            className={`${ styles.button } ${ styles.active }`}
                            onClick={ resetCountdown }
                        >
                            Abandonar ciclo ✕
                        </button>
                    ) : (
                        <button
                            className={ styles.button }
                            onClick={ startCountdown }
                        >
                            Iniciar um ciclo ▶
                        </button>
                    )}
                </>
            )}
        </div>
    )
}
