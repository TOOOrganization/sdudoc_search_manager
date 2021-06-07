import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const Login = () => import('../views/Login')
const About =() => import('../views/About.vue')
const Article = () => import("../views/Article")

const SmsArticleHead = () => import("../views/MySQL/SmsArticleHead")

const DmsArticle = () => import("../views/MongoDB/DmsArticle")
const DmsCharacter = () => import("../views/MongoDB/DmsCharacter")
const DmsWord = () => import("../views/MongoDB/DmsWord")

const SolrArticleHead = () => import("../views/Solr/SolrArticleHead")
const SolrArticle = () => import('../views/Solr/SolrArticle.vue')
const SolrCharacter = () => import("../views/Solr/SolrCharacter")
const SolrWord = () => import("../views/Solr/SolrWord")

const EditorUmsUser = () => import('../views/User/Editor/EditorUmsUser')
const EditorUmsRight = () => import('../views/User/Editor/EditorUmsRight')
const EditorUmsRole = () => import('../views/User/Editor/EditorUmsRole')
const ReaderUmsUser = () => import('../views/User/Reader/ReaderUmsUser')
const ReaderUmsRight = () => import('../views/User/Reader/ReaderUmsRight')
const ReaderUmsRole = () => import('../views/User/Reader/ReaderUmsRole')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta:{
      notShowNav: true,
      notRequireAuth: true
    }
  },
  {
    path: '/User/Editor/UmsUser',
    name: 'EditorUmsUser',
    component: EditorUmsUser
  },
  {
    path: '/User/Editor/UmsRight',
    name: 'EditorUmsRight',
    component: EditorUmsRight
  },
  {
    path: '/User/Editor/UmsRole',
    name: 'EditorUmsRole',
    component: EditorUmsRole
  },
  {
    path: '/User/Reader/UmsUser',
    name: 'ReaderUmsUser',
    component: ReaderUmsUser
  },
  {
    path: '/User/Reader/UmsRight',
    name: 'ReaderUmsRight',
    component: ReaderUmsRight
  },
  {
    path: '/User/Reader/UmsRole',
    name: 'ReaderUmsRole',
    component: ReaderUmsRole
  },
  {
    path: '/Article',
    name: 'Article',
    component: Article
  },
  {
    path: '/MySQL/SmsArticleHead',
    name: 'SmsArticleHead',
    component: SmsArticleHead
  },
  {
    path: '/MongoDB/DmsArticle',
    name: 'DmsArticle',
    component: DmsArticle
  },
  {
    path: '/MongoDB/DmsCharacter',
    name: 'DmsCharacter',
    component: DmsCharacter
  },
  {
    path: '/MongoDB/DmsWord',
    name: 'DmsWord',
    component: DmsWord
  },
  {
    path:'/Solr/SolrArticleHead',
    name:'SolrArticleHead',
    component: SolrArticleHead
  },
  {
    path:'/Solr/SolrArticle',
    name:'SolrArticle',
    component: SolrArticle
  },
  {
    path:'/Solr/SolrCharacter',
    name:'SolrCharacter',
    component: SolrCharacter
  },
  {
    path:'/Solr/SolrWord',
    name:'SolrWord',
    component: SolrWord
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
