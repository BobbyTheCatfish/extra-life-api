const DOMAIN_STUB = 'https://www.extra-life.org/';

const pageOffset = (limit: number, page: number): number => {
    if (page === 1) {
        return 1;
    }

    return limit * (page - 1);
};

export const apiPaths = {
    userDonationUrl(id: number | string, limit: number = 100, page: number = 1): string {
        if (!limit) {
            return `${DOMAIN_STUB}api/participants/${id}/donations`;
        } else {
            return `${DOMAIN_STUB}api/participants/${id}/donations?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },

    profileUrl(id: number | string): string {
        return `${DOMAIN_STUB}api/participants/${id}`;
    },

    userIncentivesUrl(id: number | string, limit: number = 100, page: number = 1): string {
        if (!limit) {
            return `${DOMAIN_STUB}api/participants/${id}/incentives`;
        } else {
            return `${DOMAIN_STUB}api/participants/${id}/incentives?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },

    userBadgesUrl(id: number | string, limit: number = 100, page: number = 1): string {
        if (!limit) {
            return `${DOMAIN_STUB}api/participants/${id}/badges`;
        } else {
            return `${DOMAIN_STUB}api/participants/${id}/badges?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },

    userMilestonesUrl(id: number | string, limit: number = 100, page: number = 1): string {
        if (!limit) {
            return `${DOMAIN_STUB}api/participants/${id}/milestones`;
        } else {
            return `${DOMAIN_STUB}api/participants/${id}/milestones?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },

    teamDonationsUrl(id: number | string, limit: number = 100, page: number = 1): string {
        if (!limit) {
            return `${DOMAIN_STUB}api/teams/${id}/donations`;
        } else {
            return `${DOMAIN_STUB}api/teams/${id}/donations?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    },

    teamProfileUrl(id: number | string): string {
        return `${DOMAIN_STUB}api/teams/${id}`;
    },

    teamRosterUrl(id: number | string, offset?: number): string {
        return `${DOMAIN_STUB}api/teams/${id}/participants${offset ? `?offset=${offset + 1}` : ''}`;
    },

    teamMilestonesUrl(id: number | string, limit: number = 100, page: number = 1): string {
        if (!limit) {
            return `${DOMAIN_STUB}api/teams/${id}/milestones`;
        } else {
            return `${DOMAIN_STUB}api/teams/${id}/milestones?limit=${limit}&offset=${pageOffset(limit, page)}`;
        }
    }
};
