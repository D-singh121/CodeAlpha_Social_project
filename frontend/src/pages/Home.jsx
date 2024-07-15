import { Feed, LeftSidebar, RightSidebar } from "../components"

const Home = () => {
	return (
		<>
			<section className='flex justify-between  w-[90%] mx-auto '>
				<LeftSidebar />
				<Feed />
				<RightSidebar />
			</section>
		</>
	)
}

export default Home	