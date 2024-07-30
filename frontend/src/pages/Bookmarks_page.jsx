import { Post } from "../components"


const Bookmarks_page = () => {
	return (
		<>
			<section className="w-[50%] border-x-2 flex justify-center flex-col items-center ">
				<div className="w-full  border-gray-200 flex justify-center items-center flex-col" >
					<h1 className="text-3xl">Your all Bookmarks..!</h1>
					<div>
						<Post />
					</div>
				</div>
			</section>

		</>
	)
}

export default Bookmarks_page	