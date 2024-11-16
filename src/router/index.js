import { createRouter, createWebHashHistory } from 'vue-router'
import AI from '@/views/AI.vue'
import Login from '@/views/Login.vue'
import Read from '@/views/Read.vue'


//教师端路由
import Tea from '@/views/Teacher.vue'
//教师端总览
import TeacherMain from '@/components/TeacherMain.vue';
//教师端课程管理
import TeacherCoursemanage from '@/components/TeacherCoursemanage.vue';
import TeacherCourseDetail from '@/components/TeacherCourseDetail.vue';
//教师端学生管理
import TeacherClassManage from '@/components/TeacherClassManage.vue';
//教师端日程管理
import Datamanage from '@/components/Datamanage.vue';
import TeacherClassDetail from '@/components/TeacherClassDetail.vue';
//教师端作业评估
import TeacherHomework from '@/components/TeacherHomework.vue';
//教师端文件上传
import TeacherUpload from '@/components/TeacherUpload.vue';

//学生端路由
import Std from '@/views/Std.vue';
//学生端总览
import StdMain from '@/components/StdMain.vue';
//学生端课程概况
import StdCoursemanager from '@/components/StdCoursemanager.vue';
import StdCourseDetail from '@/components/StdCourseDetail.vue';
//学生端作业
import StdHomework from '@/components/StdHomework.vue';



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
