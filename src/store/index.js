export const state = () => ({
    line: {
        pictureUrl: null,
        displayName: null,
        userId: null
    },
    student: {
        isShow: false,
        title: '',
        message: ''
    },
})

export const getters = {
    getProfile(state) {
        return state.line
    },
    getStudent(state) {
        return state.student
    }
}

export const mutations = {
    SET_LINE(state, data) {
        state.line = {
            ...state.line,
            ...data
        }
    },
    SET_STUDENT(state, data) {
        state.student = {
            ...state.student,
            ...data
        }
    }
}

export const actions = {
    setLine({ commit }, data) {
        commit('SET_LINE', data) //user
    },
    setStudent({ commit }, data) {
        commit('SET_STUDENT', data)
    }
}