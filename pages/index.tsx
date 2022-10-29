import { GetServerSideProps } from 'next'
import { ChallengesProvider } from '../src/contexts/ChallengesContext'
import Moveit from '../src/views/Moveit'

type HomeProps = {
    experienceData: {
        experience: number,
        level: number,
        completedChallenges: number
    },
    userData: {
        avatar: string,
        name: string,
    }
}

export default function Home({ experienceData, userData }: HomeProps) {
    return (
        <ChallengesProvider
            experienceData={ experienceData}
            userData={ userData }
        >
            <Moveit />
        </ChallengesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = ctx.req.cookies
    const experienceData = cookies.experienceData ?
        JSON.parse(cookies.experienceData) : {}
    const userData = cookies.userData ?
        JSON.parse(cookies.userData) : null
    // console.log(experienceData)

    return {
        props: { experienceData, userData }
    }
}