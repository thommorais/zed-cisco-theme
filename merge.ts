import { file } from 'bun'

type SyntaxStyle = {
	color: string
	font_style: string | null
	font_weight: number | null
}

type Style = Record<string, string | string[] | SyntaxStyle | Record<string, string>>

type Theme = {
	name: string
	appearance: string
	style: Style
}

type ThemeSchema = {
	$schema: string
	name: string
	author: string
	themes: Theme[]
}

const readJson = async (path: string): Promise<Theme | ThemeSchema> => {
	const content = await file(path).text()
	return JSON.parse(content)
}

const buildTheme = async (): Promise<void> => {
	const [base, dark] = await Promise.all([readJson('./themes/base.json'), readJson('./themes/cisco-dark.json')])

	if ('themes' in base) {
		base.themes.push({
			name: 'Cisco Dark',
			appearance: 'dark',
			style: dark as Style,
		})
	}

	await Bun.write('./cisco-theme.json', JSON.stringify(base, null, 2))

	console.log('Theme built successfully!')
}

buildTheme().catch(error => {
	console.error('Error building theme:', error)
})
