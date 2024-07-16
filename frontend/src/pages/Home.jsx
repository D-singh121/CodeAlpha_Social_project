import { Outlet } from "react-router-dom";
import { LeftSidebar, RightSidebar } from "../components"

const Home = () => {
	return (
		<>
			<section className='flex justify-between h-[100vh] w-[90%] mx-auto relative '>
				<LeftSidebar />
				<Outlet />
				<RightSidebar />
			</section>
		</>
	)
}

export default Home;	