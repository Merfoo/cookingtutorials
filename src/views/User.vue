<template>
  <div class="container">
    <div class="card">
      <img class="card-img-top" :src="profilePhotoUrl" :alt="userImgAlt">
      <div class="card-block">
        <h4 class="card-title">{{ username }}</h4>
        <p class="card-text">{{ joinedText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import user from '@/assets/js/user';

export default {
  name: 'user',
  data() {
    return {
      username: '',
      profilePhotoUrl: null,
      createdAt: null,
    };
  },
  methods: {
    update(userId) {
      user.get(userId).then((userData) => {
        this.username = userData.username;
        this.profilePhotoUrl = userData.profilePhotoUrl;
        this.createdAt = userData.createdAt;
      });
    },
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    userImgAlt() {
      return `${this.username}'s picture`;
    },
    joinedText() {
      return `Joined ${moment(this.createdAt).format('MMM Do YYYY')}`;
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.update(to.params.id);
    next();
  },
  mounted() {
    this.update(this.userId);
  },
};
</script>

<style scoped>
.card-img-top {
  width: 10rem;
}
</style>
