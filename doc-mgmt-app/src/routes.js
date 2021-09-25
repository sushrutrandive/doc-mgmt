import React from 'react';


const Documents = React.lazy(() => import('./Views/Documents'));
const Page404 = React.lazy(() => import('./Views/Pages/Page404'));
const Home = React.lazy(() => import('./Views/Home'));
const FileUpload = React.lazy(() => import('./Views/FileUpload/FileUpload'));


const routes = [	
	
	{ path: '/', name: 'Home', component: Home,exact:true},
	{ path: '/docs', name: 'Documents', component: Documents,exact:true},
	{ path: '/other', name: 'Other Tab', component: Page404,exact:true},
	{ path: '/docs/upload', name: 'Other Tab', component: FileUpload,exact:true},
];

export default routes;