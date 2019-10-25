export const defaultHeaders = (userState) => {
    return { "content-type": "application/json", "x-user": userState.user.id, "x-api-key": userState.appKey, "Authorization": `Bearer ${userState.jwtToken}` };
}