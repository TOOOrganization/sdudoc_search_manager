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
            solr与database
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.icon"
            no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
              v-for="child in item.items"
              :key="child.title"
              link
              :to="child.href"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "Aside",
  data: () => ({
    items:[
      {
        title:'MySQL',
        icon:'mdi-database',
        items:[
          {title:'sms_article_head', href:'/MySQL/SmsArticleHead'}
        ]
      },
      {
        title:'mongoDB',
        icon:'mdi-file-document-multiple-outline',
        items:[
          {title:'dms_article', href:'/MongoDB/DmsArticle'},
          {title:'dms_character', href:'/MongoDB/DmsCharacter'},
          {title:'dms_word', href:'/MongoDB/DmsWord'}
        ]
      },
      {
        title:'solr',
        icon:'mdi-cloud-search-outline',
        items:[
          {title:'solr_article_head', href:'/Solr/SolrArticleHead'},
          {title:'solr_article', href:'/Solr/SolrArticle'},
          {title:'solr_character', href:'/Solr/SolrCharacter'},
          {title:'solr_word', href:'/Solr/SolrWord'}
        ]
      }
    ],
      MySQL: [
        ['sms_article_head']
      ],
      right: null,
  }),
}
</script>

<style scoped>

</style>