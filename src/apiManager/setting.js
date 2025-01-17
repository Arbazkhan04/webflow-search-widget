import api from './api';

export const getSearchPreference = async (userId, siteId) => {
    const res = await api.get(`/searchPreferenceManagementRoutes/getSearchPreference/${userId}`, {
        params: { siteId },
    });
    return res.data;
};

