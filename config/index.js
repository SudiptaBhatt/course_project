module.exports = {
	app: {
		port: process.env.PORT || 3000,
		appName: process.env.APP_NAME || 'Courses',
		env: process.env.NODE_ENV || 'development',
		isProd: (process.env.NODE_ENV === 'prod'),
		getPort: process.env.PORT || 3000,
		getApiFolderName: process.env.API_FOLDER_NAME || 'api',
		project_name: "Courses",
		project_description: "Courses Project"
	}
};