import { createRouter, createWebHashHistory } from 'vue-router'
import AI from '@/views/AI.vue'
import Login from '@/views/Login.vue'
import Read from '@/views/Read.vue'


//教师端路由
const Tea = () => import('@/views/Teacher.vue')
//教师端总览
const TeacherMain = () => import('@/components/TeacherMain.vue')
//教师端课程管理
const TeacherCoursemanage = () => import('@/components/TeacherCoursemanage.vue')
const TeacherCourseDetail = () => import('@/components/TeacherCourseDetail.vue')
//教师端学生管理
const TeacherClassManage = () => import('@/components/TeacherClassManage.vue')
//教师端日程管理
const Datamanage = () => import('@/components/Datamanage.vue')
const TeacherClassDetail = () => import('@/components/TeacherClassDetail.vue')

//教师端作业评估
const TeacherHomework = () => import('@/components/TeacherHomework.vue')
//教师端文件上传
const TeacherUpload = () => import('@/components/TeacherUpload.vue')
//学生端路由
const Std = () => import('@/views/Std.vue')
//学生端总览
const StdMain = () => import('@/components/StdMain.vue')

//学生端课程概况
const StdCoursemanager = () => import('@/components/StdCoursemanager.vue')
const StdCourseDetail = () => import('@/components/StdCourseDetail.vue')

//学生端作业
const StdHomework = () => import('@/components/StdHomework.vue')



const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/std',
      name: 'std',
      component: Std,
      children: [
        {
          path: '',
          name: 'redirect',
          redirect: '/std/StdMain'
        },
        {
          path: 'StdCoursemanager',
          component: StdCoursemanager,
        },
        {
          path: 'homework',
          component: Datamanage,
        },
        {
          path: 'datamanage',
          component: Datamanage,
        },
        {
          path: 'StdCourseDetail',
          component: StdCourseDetail,
        },
        {
          path: 'StdMain',
          component: StdMain,
        },
        {
          path: 'StdHomework',
          component: StdHomework,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: Tea,
      children: [
        {
          path: '',
          name: 'nihao',
          redirect: '/teacher/TeacherMain'
        },
        {
          path: 'TeacherMain',
          name: 'TeacherMain',
          component: TeacherMain,
        },
        {
          path: 'TeacherCoursemanage',
          name: 'TeacherCoursemanage',
          component: TeacherCoursemanage,
        },
        {
          path: 'TeacherCourseDetail',
          name: 'TeacherCourseDetail',
          component: TeacherCourseDetail
        },
        {
          path: 'TeacherClassManage',
          name: 'TeacherClassManage',
          component: TeacherClassManage,
        },
        {
          path: 'TeacherClassDetail',
          name: 'TeacherClassDetail',
          component: TeacherClassDetail,
        },
        {
          path: 'Datamanage',
          name: 'Datamanage',
          component: Datamanage,
        },
        {
          path: 'TeacherHomework',
          name: 'TeacherHomework',
          component: TeacherHomework,
        },
        {
          path: 'TeacherUpload',
          name: 'TeacherUpload',
          component: TeacherUpload,
        },
      ]

    },
    {
      path: '/read',
      component: Read,
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

export default router
