const endpoints = {
    user: {
        register: 'http://localhost:8080/volunteers/register',
        login: 'http://localhost:8080/volunteers/login',
        createPhoto: (userId: number) => `http://localhost:8080/volunteers/user/${userId}/photo`,
        getPhotos: (userId: number) => `http://localhost:8080/volunteers/user/${userId}/photo`,
        getAll: 'http://localhost:8080/volunteers/user'
    },
    items: {
        getAll: 'http://localhost:8080/volunteers/item',
        getPhotoAll: (itemId: number) => `http://localhost:8080/volunteers/item/${itemId}/photo`,
        postItem: 'http://localhost:8080/volunteers/item',
        deleteItem: (itemId: number) => `http://localhost:8080/volunteers/item/${itemId}`,
        postPhoto: (itemId: number) => `http://localhost:8080/volunteers/item/${itemId}/photo`,
    },
    request: {
        getAll: 'http://localhost:8080/volunteers/request',
        postRequest: () => `http://localhost:8080/volunteers/request`,
        postItemRequest: (requestId: number) => `http://localhost:8080/volunteers/request/${requestId}/item`,
        getAllReqItems: (reqestId: number) => `http://localhost:8080/volunteers/request/${reqestId}/item`
    },
    response: {
        getAll: 'http://localhost:8080/volunteers/response',
        postRequest: () => `http://localhost:8080/volunteers/response`,
    }
}

export default endpoints;