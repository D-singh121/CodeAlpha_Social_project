import { Feed, LeftSidebar, RightSidebar } from "../components"

const Home = () => {
	return (
		<>
			<section className='flex justify-between h-[100vh] w-[90%] mx-auto relative '>
				<LeftSidebar />
				<Feed />
				<RightSidebar />
			</section>
		</>
	)
}

export default Home	