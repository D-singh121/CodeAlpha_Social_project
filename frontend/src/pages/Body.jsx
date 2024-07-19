import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, AuthPage, Profile_page } from "./index.js";
import { Feed } from '../components/index.js'
import NoPage from "./NoPage.jsx";
import Bookmarks_page from "./Bookmarks_page.jsx";

const Body = () => {
	const appRouter = createBrowserRouter([
		{
			path: "/",
			element: <Home />,
			children: [
				{
					path: "/",
					element: <Feed />
				},
				{
					path: "/profile/:id",
					element: <Profile_page />
				},
				{
					path: "/bookmarks",
					element: <Bookmarks_page />
				}
			]
		},
		{
			path: "/login",
			element: <AuthPage />
		},
		{
			path: "*",
			element: <NoPage />
		}

	])
	return (
		<div>
			<RouterProvider router={appRouter} />
		</div>
	)
}

export default Body