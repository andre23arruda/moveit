import { GetServerSideProps } from 'next'
import { ChallengesProvider } from '../src/contexts/ChallengesContext'
import Moveit from '../src/views/Moveit'

type HomeProps = {
    experienceData: {
        experience: number,
        level: number,
        completedChallenges: number
    }
}

export default function Home({ experienceData }: HomeProps) {
    return (
        <ChallengesProvider
            experienceData={experienceData}
        >
            <Moveit />
        </ChallengesProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = ctx.req.cookies
    const experienceData = cookies.experienceData ?
        JSON.parse(cookies.experienceData) : {
        experience: 0,
        level: 1,
        completedChallenges: 0
    }

    console.log(experienceData)

    return {
        props: { experienceData }
    }
}