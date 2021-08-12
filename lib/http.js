/*
 * @Author: Vane
 * @Date: 2021-08-11 11:05:24
 * @LastEditTime: 2021-08-11 15:55:06
 * @LastEditors: Vane
 * @Description:
 * @FilePath: \cli-vane\lib\http.js
 */

// 通过 axios 处理请求
const axios = require('axios');

const USER = 'mottzz87';

const REPOS_ROOT_GITHUB = `https://api.github.com/users/${USER}`; //个人: users 组织：orgs 取决于管理容器

const REPO_TAGS_ROOT_GITHUB = `https://api.github.com/repos/${USER}`;

axios.interceptors.response.use((res) => {
	return res.data;
});

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
	return axios.get(`${REPOS_ROOT_GITHUB}/repos`);
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function getTagList(repo) {
	return axios.get(`${REPO_TAGS_ROOT_GITHUB}/${repo}/tags`);
}

/**
 * 模板下载
 * @param {string} repo 模板名称
 * @param {string} tag 模板版本号
 * @returns Promise
 */
const repoDownload = (repo, tag) => `${USER}/${repo}${tag ? '#' + tag : ''}`;

module.exports = {
	getRepoList,
	getTagList,
	repoDownload,
};
