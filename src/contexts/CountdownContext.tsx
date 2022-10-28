import React, { createContext, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengesContext'

type CountdownContextData = {
    isActive: boolean,
    hasFinished: boolean,
    minutes: number,
    seconds: number,
    startCountdown: () => void,
    resetCountdown: () => void,
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout
const initialTime = 25 * 60
// const initialTime = 0.1 * 20

export function CountdownProvider({ children }: React.PropsWithChildren) {
    const { newChallenge } = useContext(ChallengesContext)
    const [time, setTime] = useState(initialTime)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountdown() {
        setIsActive(true)
    }

    function resetCountdown() {
        window.clearTimeout(countdownTimeout)
        setIsActive(false)
        setHasFinished(false)
        setTime(initialTime)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if(isActive && time === 0) {
            setIsActive(false)
            setHasFinished(true)
            newChallenge()
        }
    }, [isActive, time])


    return (
        <CountdownContext.Provider
            value={{
                isActive,
                hasFinished,
                minutes,
                seconds,
                startCountdown,
                resetCountdown,
            }}
        >
            { children }
        </CountdownContext.Provider>
    )
}