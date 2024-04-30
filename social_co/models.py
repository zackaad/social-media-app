from django.db import models
from social_auth.models import Profile


class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()


class Comment(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
