from django.db import models
from social_auth.models import Profile
from django.utils import timezone  # Import timezone for default now value


class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    title = models.CharField(max_length=30, default=None)
    content = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)  # New field




class Comment(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)