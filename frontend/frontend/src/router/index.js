import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../components/Main.vue'

import Register from '../views/Register.vue'
import LogIn from '../views/Login.vue'

import Home from '../views/Home.vue'



import HitSong from '../views/User/HitSong.vue'
import Singer from '../views/User/Singer.vue'
import Rank from '../views/User/Rank.vue'
import playlist from '../views/User/playlist'
import playmusic from '../components/common/PlayMusic.vue'
// import playbar from '../views/User/PlayBar.vue'
// import TeacherQualification from '../views/Teacher/TeacherQualification.vue'

import AdminMine from '../components/AdminMine.vue'
import PublishSystemMessage from '../views/Admin/PublishSystemMessage.vue'
import AuditWork from '../views/Admin/AuditWork.vue'
import AdminInformation from '../views/Admin/AdminInformation.vue'
import UserMine from '../components/UserMine.vue'
import UserFavorite from '../views/User/UserFavorite.vue'
import UserInformation from '../views/User/UserInformation.vue'
import UserSystemMessage from '../views/User/UserSystemMessage.vue'



// import PlayListDetail from '../views/User/PlayListDetail'

// import AdminInformation from '../views/Admin/AdminInformation.vue'
// import AdminQualification from '../views/Admin/AdminQualification.vue'




Vue.use(VueRouter)

const routes = [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
    {
        path: '/',
        redirect: '/Home',
    },
    {
        path: '/LogIn',
        name: 'LogIn',
        component: LogIn,
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/playmusic',
        name: 'playmusic',
        component: playmusic
    },
    {
        path: '/Main',
        name: 'Main',
        component: Main,
        redirect: '/Home',
        children: [{
            path: '/Home',
            name: 'Home',
            component: Home
        },
        {
            path: '/HitSong',
            name: 'HitSong',
            component: HitSong
        },
        //
        // {
        //     path: "/play-list-detail/:id",
        //     component: PlayListDetail
        //   },
        {
            path: '/Singer',
            name: 'Singer',
            component: Singer
        },
        {
            path: '/Rank',
            name: 'Rank',
            component: Rank
        },
        {
            path: '/playlist',
            name: 'playlist',
            component: playlist
        },

        {
            path: '/AdminMine',
            name: 'AdminMine',
            component: AdminMine,
            children: [{
                path: '/PublishSystemMessage',
                name: 'PublishSystemMessage',
                component: PublishSystemMessage,
            },
            {
                path: '/AuditWork',
                name: 'AuditWork',
                component: AuditWork,
            },
            {
                path: '/AdminInformation',
                name: 'AdminInformation',
                component: AdminInformation,
            }
            ]
        },
        {
            path: '/UserMine',
            name: 'UserMine',
            component: UserMine,
            redirect: '/UserInformation',
            children: [{
                path: '/UserInformation',
                name: 'UserInformation',
                component: UserInformation,
            },
            {
                path: '/UserFavorite',
                name: 'UserFavorite',
                component: UserFavorite,
            },
            {
                path: '/UserSystemMessage',
                name: 'UserSystemMessage',
                component: UserSystemMessage,
            },
            ]
        },
        {
            path: '*',
            name: 'notfount',
            // component: notfount
        }
        ]
    },

]



const router = new VueRouter({
    routes
});

export default router;
