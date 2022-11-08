import Head from 'next/head'

import ChallengeBox from '../../components/ChallengeBox'
import CompletedChallenge from '../../components/CompletedChallenge'
import Countdown from '../../components/Countdown'
import ExperienceBar from '../../components/ExperienceBar'
import LevelUpModal from '../../components/LevelUpModal'
import LogoutModal from '../../components/LogoutModal'
import Profile from '../../components/Profile'

import { CountdownProvider } from '../../contexts/CountdownContext'

import styles from './styles.module.scss'

export default function Moveit() {
    return (
        <div className={ styles.container }>
            <Head>
                <title>Início | Move.it</title>
            </Head>

            <ExperienceBar />

            <CountdownProvider>
                <section>
                    <div>
                        <Profile />

                        <CompletedChallenge />

                        <Countdown />
                    </div>

                    <div>
                        <ChallengeBox />
                    </div>
                </section>
            </CountdownProvider>

            {/* <LevelUpModal /> */}

            <LogoutModal />
        </div>
    )
}
