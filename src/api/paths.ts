import env from "../env";

const api = {
    travelChecker: `${ env.REACT_APP_GATEWAY_BASE_URL }/api/v1/travel-checker`,
}

export const travelChecker = {
    authentication: `${ api.travelChecker }/authentication`,
    authorization: `${ api.travelChecker }/authorization`,

    forgetPassword: `${ api.travelChecker }/forget-password`,
    resetPassword: `${ api.travelChecker }/reset-password?token=`,
}