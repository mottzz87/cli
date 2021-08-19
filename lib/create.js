/*
 * @Author: Vane
 * @Date: 2021-08-11 10:34:46
 * @LastEditTime: 2021-08-12 09:44:38
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \cli-vane\lib\create.js
 */

const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const Generator = require('./generator');

module.exports = async function (name, options) {
	// 执行创建命令

	// 当前命令行选择的目录
	const cwd = process.cwd();

	// 需要创建的目录地址
	const targetAir = path.join(cwd, name);

	// 创建项目
	const generator = new Generator(name, targetAir);

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
			console.log(11111111, answers);

			handleDirExist();

			// 开始创建项目
			generator.create();
		});

	// 目录是否已经存在？
	const handleDirExist = async () => {
		if (fs.existsSync(targetAir)) {
			// 是否强制创建？
			if (options.force) {
				await fs.remove(targetAir);
			} else {
				// TODO：询问用户是否确定要覆盖
				let { action } = await inquirer.prompt([
					{
						name: 'action',
						type: 'list',
						message:
							'Target directory already exists Pick an action:',
						choices: [
							{
								name: 'Overwrite',
								value: 'overwrite',
							},
							{
								name: 'Cancel',
								value: false,
							},
						],
					},
				]);

				if (!action) {
					return;
				} else if (action === 'overwrite') {
					// 移除已存在的目录
					console.log(`\r\nRemoving...`);
					await fs.remove(targetAir);
				}
			}
		}
	};
};
