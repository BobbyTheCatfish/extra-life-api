"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamMilestones = exports.getTeamRoster = exports.getTeamDonations = exports.getTeamInfo = exports.getUserBadges = exports.getUserIncentives = exports.getUserMilestones = exports.getUserDonations = exports.getUserInfo = void 0;
const node_fetch_1 = require("node-fetch");
const api_paths_1 = require("./helpers/api-paths");
const getUserInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.profileUrl(id);
        let userInfoJson = {};
        (0, node_fetch_1.default)(url)
            .then((res) => {
            try {
                userInfoJson = res.json();
                userInfoJson.avatarImageURL = 'https:' + userInfoJson.avatarImageURL;
                userInfoJson.donateURL = `https://www.extra-life.org/index.cfm?fuseaction=donate.participant&participantID=${id}`;
                if (userInfoJson.teamID) {
                    (0, exports.getTeamInfo)(userInfoJson.teamID, false)
                        .then((data) => {
                        userInfoJson.teamURL = data.teamURL;
                        resolve(userInfoJson);
                    }).catch((reason) => {
                        reject(reason);
                    });
                }
                else {
                    resolve(userInfoJson);
                }
            }
            catch (e) {
                reject(e);
            }
        })
            .catch(() => {
            console.log('Error parsing userInfo URL');
            reject('There was an error trying to make your request');
        });
    });
});
exports.getUserInfo = getUserInfo;
const getUserDonations = (id_1, ...args_1) => __awaiter(void 0, [id_1, ...args_1], void 0, function* (id, limit = 100, page = 1) {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.userDonationUrl(id, limit, page);
        const userDonationsJson = {};
        (0, node_fetch_1.default)(url)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                userDonationsJson.countDonations = parseInt(res.headers.get('num-records'), 10) || 0;
                userDonationsJson.countPages = Math.ceil(userDonationsJson.countDonations / limit);
                userDonationsJson.donations = yield res.json();
                resolve(userDonationsJson);
            }
            catch (e) {
                reject(e);
            }
        }))
            .catch(() => {
            console.log('Error parsing userDonations URL');
            reject('There was an error trying to make your request');
        });
    });
});
exports.getUserDonations = getUserDonations;
const getUserMilestones = (id_2, ...args_2) => __awaiter(void 0, [id_2, ...args_2], void 0, function* (id, limit = 100, page = 1) {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.userMilestonesUrl(id, limit, page);
        const userMilestonesJson = {};
        (0, node_fetch_1.default)(url)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                userMilestonesJson.countMilestones = parseInt(res.headers.get('num-records'), 10) || 0;
                userMilestonesJson.countPages = Math.ceil(userMilestonesJson.countMilestones / limit);
                userMilestonesJson.milestones = yield res.json();
                resolve(userMilestonesJson);
            }
            catch (e) {
                reject(e);
            }
        }))
            .catch(() => {
            console.log('Error parsing userMilestones URL');
            reject('There was an error trying to make your request');
        });
    });
});
exports.getUserMilestones = getUserMilestones;
const getUserIncentives = (id_3, ...args_3) => __awaiter(void 0, [id_3, ...args_3], void 0, function* (id, limit = 100, page = 1) {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.userIncentivesUrl(id, limit, page);
        const userIncentivesJson = {};
        (0, node_fetch_1.default)(url)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                userIncentivesJson.countIncentives = parseInt(res.headers.get('num-records'), 10) || 0;
                userIncentivesJson.countPages = Math.ceil(userIncentivesJson.countIncentives / limit);
                userIncentivesJson.incentives = yield res.json();
                resolve(userIncentivesJson);
            }
            catch (e) {
                reject(e);
            }
        }))
            .catch(() => {
            console.log('Error parsing userIncentives URL');
            reject('There was an error trying to make your request');
        });
    });
});
exports.getUserIncentives = getUserIncentives;
const getUserBadges = (id_4, ...args_4) => __awaiter(void 0, [id_4, ...args_4], void 0, function* (id, limit = 100, page = 1) {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.userBadgesUrl(id, limit, page);
        const userBadgesJson = {};
        (0, node_fetch_1.default)(url)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                userBadgesJson.countBadges = parseInt(res.headers.get('num-records'), 10) || 0;
                userBadgesJson.countPages = Math.ceil(userBadgesJson.countBadges / limit);
                userBadgesJson.badges = yield res.json();
                resolve(userBadgesJson);
            }
            catch (e) {
                reject(e);
            }
        }))
            .catch(() => {
            console.log('Error parsing userBadges URL');
            reject('There was an error trying to make your request');
        });
    });
});
exports.getUserBadges = getUserBadges;
const getTeamInfo = (id_5, ...args_5) => __awaiter(void 0, [id_5, ...args_5], void 0, function* (id, fetchRoster = true) {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.teamProfileUrl(id);
        let teamInfoJson = {};
        (0, node_fetch_1.default)(url)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                teamInfoJson = yield res.json();
            }
            catch (e) {
                reject(e);
            }
            teamInfoJson.avatarImageURL = 'http:' + teamInfoJson.avatarImageURL;
            if (fetchRoster) {
                (0, exports.getTeamRoster)(id)
                    .then((rosterData) => {
                    teamInfoJson.members = rosterData.members.map((u) => {
                        u.URL = `https://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=${u.participantID}`;
                        return u;
                    });
                    resolve(teamInfoJson);
                }).catch((reason) => {
                    reject(reason);
                });
            }
            else {
                resolve(teamInfoJson);
            }
        }))
            .catch(() => {
            console.log('Error obtaining team info');
            reject('There was an error trying to make your request');
        });
    });
});
exports.getTeamInfo = getTeamInfo;
const getTeamDonations = (id_6, ...args_6) => __awaiter(void 0, [id_6, ...args_6], void 0, function* (id, limit = 100, page = 1) {
    return new Promise((resolve, reject) => {
        const teamDonationsJson = {};
        const url = api_paths_1.apiPaths.teamDonationsUrl(id, limit, page);
        (0, node_fetch_1.default)(url)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                teamDonationsJson.countDonations = parseInt(res.headers.get('num-records'), 10) || 0;
                teamDonationsJson.countPages = Math.ceil(teamDonationsJson.countDonations / limit);
                teamDonationsJson.donations = yield res.json();
            }
            catch (e) {
                reject(e);
            }
            resolve(teamDonationsJson);
        }))
            .catch(() => {
            console.log('Error parsing teamDonations URL');
            reject('There was an error trying to make your request');
        });
    });
});
exports.getTeamDonations = getTeamDonations;
const getTeamRoster = (id, page) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const teamRosterJson = {};
        const offsetCalc = (page && page !== 1) ? ((page - 1) * 100) : null;
        const url = api_paths_1.apiPaths.teamRosterUrl(id, offsetCalc);
        (0, node_fetch_1.default)(url)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                teamRosterJson.countMembers = parseInt(res.headers.get('num-records'), 10) || 0;
                teamRosterJson.countPages = Math.ceil(teamRosterJson.countMembers / 100);
                try {
                    teamRosterJson.members = yield res.json();
                }
                catch (e) {
                    teamRosterJson.members = [];
                }
            }
            catch (e) {
                reject(e);
            }
            if (!teamRosterJson.members) {
                teamRosterJson.members = [];
            }
            teamRosterJson.members.forEach((member) => {
                member.avatarImageURL = 'https:' + member.avatarImageURL;
            });
            resolve(teamRosterJson);
        }))
            .catch(() => {
            console.log('Error parsing teamRoster URL');
            reject('There was an error trying to make your request');
        });
    });
});
exports.getTeamRoster = getTeamRoster;
const getTeamMilestones = (id_7, ...args_7) => __awaiter(void 0, [id_7, ...args_7], void 0, function* (id, limit = 100, page = 1) {
    return new Promise((resolve, reject) => {
        const url = api_paths_1.apiPaths.teamMilestonesUrl(id, limit, page);
        const teamMilestonesJson = {};
        (0, node_fetch_1.default)(url)
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                teamMilestonesJson.countMilestones = parseInt(res.headers.get('num-records'), 10) || 0;
                teamMilestonesJson.countPages = Math.ceil(teamMilestonesJson.countMilestones / limit);
                teamMilestonesJson.milestones = yield res.json();
                resolve(teamMilestonesJson);
            }
            catch (e) {
                reject(e);
            }
        }))
            .catch(() => {
            console.log('Error parsing teamMilestones URL');
            reject('There was an error trying to make your request');
        });
    });
});
exports.getTeamMilestones = getTeamMilestones;
