import api from './api';

export const search = async (query, userId, siteId) => {
    const res = await api.post('/searchManagementRoutes/search', {
        query,
        userId,
        siteId,
    });
    return res.data;
};

