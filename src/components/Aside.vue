<template>
  <v-card
      height=100%
      class="mx-auto"
  >
    <v-navigation-drawer>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            SDUDOC后台管理
          </v-list-item-title>
          <v-list-item-subtitle>
            Solr and DataBase
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.href"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
        <v-list-group
            prepend-icon="mdi-database"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Data</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-group
              v-for="item in dataItems"
              :key="item.title"
              no-action
              sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
                v-for="child in item.items"
                :key="child.title"
                :to="child.href"
            >
              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "Aside",
  data: () => ({
    items: [
      {
        title:' Home',
        icon: 'mdi-home',
        href: '/'
      },
      {
        title: 'User Management',
        icon: 'mdi-account-circle',
        href: '/User'
      },
      {
        title: 'Article Management',
        icon: 'mdi-book',
        href: '/Article'
      }
    ],
    dataItems: [
      {
        title: 'MySQL',
        items: [
          {title: 'sms_article_head', href: '/MySQL/SmsArticleHead'}
        ]
      },
      {
        title: 'mongoDB',
        items: [
          {title: 'dms_article', href: '/MongoDB/DmsArticle'},
          {title: 'dms_character', href: '/MongoDB/DmsCharacter'},
          {title: 'dms_word', href: '/MongoDB/DmsWord'}
        ]
      },
      {
        title: 'solr',
        items: [
          {title: 'solr_article_head', href: '/Solr/SolrArticleHead'},
          {title: 'solr_article', href: '/Solr/SolrArticle'},
          {title: 'solr_character', href:'/Solr/SolrCharacter'},
          {title: 'solr_word', href: '/Solr/SolrWord'}
        ]
      }
    ],
  }),
}
</script>

<style scoped>

</style>