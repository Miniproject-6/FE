import apiRequest from '.';

const RESOURCE = '/api/users';

export const getUser = async ({ id }: { id: number }) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}/${id}`);

    return response.data.data;
  } catch (error) {
    throw new Error('API getUser error');
  }
};
