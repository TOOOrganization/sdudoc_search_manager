import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const About =() => import('../views/About.vue')
const User = () => import("../views/User")
const Article = () => import("../views/Article")

const SmsArticleHead = () => import("../views/MySQL/SmsArticleHead")

const DmsArticle = () => import("../views/MongoDB/DmsArticle")
const DmsCharacter = () => import("../views/MongoDB/DmsCharacter")
const DmsWord = () => import("../views/MongoDB/DmsWord")

const SolrArticleHead = () => import("../views/Solr/SolrArticleHead")
const SolrArticle = () => import('../views/Solr/SolrArticle.vue')
const SolrCharacter = () => import("../views/Solr/SolrCharacter")
const SolrWord = () => import("../views/Solr/SolrWord")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/User',
    name: 'User',
    component: User
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
  mode:'hash'
})

export default router
