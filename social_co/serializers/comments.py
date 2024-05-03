from rest_framework import serializers
from social_auth.models import Profile
from social_co.models import Comment, Post


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='pk', queryset=Profile.objects.all())
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        fields = ('id', 'author', 'content', 'post', 'created_at')
