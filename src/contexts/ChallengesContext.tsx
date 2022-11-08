import React, { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../data/challenges.json'
import { useRouter } from 'next/router'

type ExperienceData = {
    experience: number,
    level: number,
    completedChallenges: number
}

type UserData = {
    avatar: string,
    name: string,
}

type ChallengeData = {
    type: string,
    description: string,
    amount: number,
}

type ChallengesContextData = {
    experienceData: ExperienceData,
    userData: UserData,
    activeChallenge: ChallengeData | null,
    newChallenge: () => void,
    resetChallenge: () => void,
    completeChallenge: () => void,
    experienceToNextLevel: number,
    showLevelUp: boolean,
    setShowLevelUp: React.Dispatch<React.SetStateAction<boolean>>,
    showLogout: boolean,
    setShowLogout: React.Dispatch<React.SetStateAction<boolean>>,
}

type ChallengesProviderProps = {
    experienceData: ExperienceData,
    userData: UserData,
    children: ReactNode,
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, userData, ...rest }: ChallengesProviderProps) {
    const router = useRouter()
    const [activeChallenge, setActiveChallenge] = useState<ChallengeData | null>(null)
    const [experienceData, setExperienceData] = useState(rest.experienceData)
    const [showLevelUp, setShowLevelUp] = useState(false)
    const [showLogout, setShowLogout] = useState(false)

    const experienceToNextLevel = Math.pow((experienceData.level + 1) * 4, 2)

    function newChallenge() {
        const challengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[challengeIndex]
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()
        if(Notification.permission === 'granted') {
            new Notification(
                'Novo desafio 🎉',
                { body: `Novo desafio valendo ${ challenge.amount }xp` }
            )
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge)
            return
        let currentExperience = experienceData.experience + activeChallenge.amount
        let currentLevel = experienceData.level
        if (currentExperience >= experienceToNextLevel) {
            currentExperience = currentExperience - experienceToNextLevel
            currentLevel += 1
            setShowLevelUp(true)
        }
        setExperienceData({
            experience: currentExperience,
            completedChallenges: experienceData.completedChallenges + 1,
            level: currentLevel
        })
        setActiveChallenge(null)
    }

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set(
            'experienceData',
            JSON.stringify(experienceData)
        )
    }, [experienceData])

    useEffect(() => {
        if (!userData) {
            router.push('/login')
        }
    }, [])

    return (
        <ChallengesContext.Provider
            value={{
                activeChallenge,
                experienceData,
                newChallenge,
                resetChallenge,
                completeChallenge,
                experienceToNextLevel,
                showLevelUp,
                setShowLevelUp,
                showLogout,
                setShowLogout,
                userData,
            }}
        >
            { userData ? children : null }
        </ChallengesContext.Provider>
    )
}