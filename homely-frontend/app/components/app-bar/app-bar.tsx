import SideMenu from '../sideMenu/sideMenu';

export default function AppBar() {
	return (
		// <header className='p-2 bg-pink-400 dark:bg-pink-950 text-pink-100 dark:text-pink-50 '>
		// 	<h1 className='flex justify-center items-center'>Homely</h1>
		// </header>
		<div className='grid grid-cols-3 p-4  bg-pink-400 dark:bg-pink-950 text-pink-100 dark:text-pink-50 '>
			<SideMenu />
			<h1 className='flex justify-center items-center'>Homely</h1>
		</div>
	);
}
