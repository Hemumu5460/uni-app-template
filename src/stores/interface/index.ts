/* GlobalState */
export interface GlobalState {
	userInfo: UserInfo
}
// 用户信息
export interface UserInfo {
	nickname?: string | null | undefined
	openid?: string | null | undefined
	phone?: string | null | undefined
	token?: string | null | undefined
	unionid?: string | null | undefined
}
