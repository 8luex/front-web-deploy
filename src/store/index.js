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
    },
    getters: {
        getLine(state) {
            return state.line
        },
        getStudent(state) {
            return state.student
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
        }
    },
    actions: {
        setLine({ commit }, data) {
            commit('SET_LINE', data) //user
        },
        setStudent({ commit }, data) {
            commit('SET_STUDENT', data)
        }
    }
})

export default store;