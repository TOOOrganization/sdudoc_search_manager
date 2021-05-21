import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import SmsArticleHead from "../views/MySQL/SmsArticleHead";

import DmsArticle from "../views/MongoDB/DmsArticle";
import DmsCharacter from "../views/MongoDB/DmsCharacter";
import DmsWord from "../views/MongoDB/DmsWord";

import SolrArticleHead from "../views/Solr/SolrArticleHead";
import SolrArticle from '../views/Solr/SolrArticle.vue'
import SolrCharacter from "../views/Solr/SolrCharacter";
import SolrWord from "../views/Solr/SolrWord";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    component:SolrArticleHead
  },
  {
    path:'/Solr/SolrArticle',
    name:'SolrArticle',
    component:SolrArticle
  },
  {
    path:'/Solr/SolrCharacter',
    name:'SolrCharacter',
    component:SolrCharacter
  },
  {
    path:'/Solr/SolrWord',
    name:'SolrWord',
    component:SolrWord
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
