#! /usr/bin/env node

const program = require('commander');
const figlet = require('figlet');
const chalk = require('chalk');

program
	// 定义命令和参数
	.command('create <app-name>')
	// 登录命令
	.command('login', 'user login')
	// 登出命令
	.command('logout', 'user logout')
	// 查看当前用户信息
	.command('userinfo', 'who am i')
	.description('create a new project')
	// -f or --force 为强制创建，如果创建的目录存在则直接覆盖
	.option('-f, --force', 'overwrite target directory if it exist')
	.action((name, options) => {
		// 在 create.js 中执行创建任务
		require('../lib/create.js')(name, options);
	});
program
	// 配置版本号信息
	.version(`v${require('../package.json').version}`)
	.usage('<command> [option]');
program.on('--help', () => {
	// 绘制 Logo
	console.log(
		'\r\n' +
			figlet.textSync('VANE', {
				font: 'Ghost',
				horizontalLayout: 'default',
				verticalLayout: 'default',
				width: 180,
				whitespaceBreak: true,
			})
	);

	// 添加说明信息
	console.log(
		`\r\nRun ${chalk.cyan(
			`vane <command> --help`
		)} for detailed usage of given command\r\n`
	);
});

// 解析用户执行命令传入参数
program.parse(process.argv);
