/** @type {import('next').NextConfig} */
module.exports = {
	output: 'standalone',
	experimental: {
		appDir: true,
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
}
