#! /usr/bin/env node

process.env.NODE_ENV = 'production';

const program = require('commander');
// 命令行交互工具
const inquirer = require('inquirer');
const chalk = require('chalk');
const { merge } = require('lodash');
const { saveAuthorized } = require('../lib/access');
// const { login, fetchUserProjects } = require('../lib/api');

const login = () => {};
const fetchUserProjects = () => {};

program.option('--outer', 'outer network', false);
program.parse(process.argv);
// 判断使用登录网络地址: 外网地址 || 内网
const outer = program.outer || false;

inquirer
	.prompt([
		{
			type: 'input',
			name: 'username',
			message: '请输入用户名',
		},
		{
			type: 'password',
			name: 'password',
			message: '请输入密码',
			mask: '*',
		},
	])
	.then((answers) => {
		// 命令行交互获取的用户名/密码
		const username = answers.username;
		const password = answers.password;
		// axios请求登录接口请求用户信息
		login(username, password, outer)
			.then(({ user, token }) => {
				let auth = merge({}, user, { token });
				// 获取用户授权项目
				fetchUserProjects(auth.username === 'admin', auth, outer).then(
					(projects) => {
						// 保存.authorized 用户授权信息
						saveAuthorized(merge({}, auth, { projects }));
						console.log(chalk.yellow('登录成功'));
					}
				);
			})
			.catch((err) => {
				console.log(chalk.red(err.response ? err.response.data : err));
			});
	});
