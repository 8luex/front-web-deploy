import { createApp } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
    state: {
        line: {
            pictureUrl: null,
            displayName: null,
            userId: null
        },
        student: {
            id: null,
            fname: null,
            lname: null,
            pass: null,
            faculty: null
        },
        activity: {
            name: null,
            detail: null,
            image: null,
            location: null,
            eventDate: null,
            timeStart: null,
            timeEnd: null,
            hoursToReceive: null,
            max: null,
        },
        admin: {
            user: null,
            pass: null
        }
    },
    getters: {
        getLine(state) {
            return state.line
        },
        getStudent(state) {
            return state.student
        },
        getActivity(state) {
            return state.activity
        },
        getAdmin(state) {
            return state.admin
        }
    },
    mutations: {
        // SET_NOTE(state, data) {
        //     state.note.push(data);
        // },
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
        },
        SET_ACTIVITY(state, data) {
            state.activity = {
                ...state.activity,
                ...data
            }
        },
        SET_ADMIN(state, data) {
            state.admin = {
                ...state.admin,
                ...data
            }
        }
    },
    actions: {
        setLine({ commit }, data) {
            commit('SET_LINE', data) //user
        },
        setStudent({ commit }, data) {
            commit('SET_STUDENT', data)
        },
        setActivity({ commit }, data) {
            commit('SET_ACTIVITY', data)
        },
        setAdmin({ commit }, data) {
            commit('SET_ADMIN', data)
        }
    }
})

export default store;