import { defineStore, createPinia } from "pinia";
import type { GlobalState, UserInfo } from "./interface";
import piniaPersist from 'pinia-plugin-persist-uni'

// 初始化userInfo
export function initUserInfo(): UserInfo {
	return {
		nickname: undefined,
		openid: undefined,
		phone: undefined,
		token: undefined,
		unionid: undefined,
	}
}
// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
	// id: 必须的，在所有 Store 中唯一
	id: "GlobalState",
	// state: 返回对象的函数
	state: (): GlobalState => ({
		// 用户信息
		userInfo: initUserInfo(),
	}),
	getters: {
		token: (state) => state.userInfo.token,
		phone: (state) => state.userInfo.phone
	},
	actions: {
		// setToken
		setUserInfo(data: UserInfo) {
			Object.assign(this.userInfo, data)
		}
	},
	persist: {
		enabled: true,
	},
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPersist)

export default pinia;
