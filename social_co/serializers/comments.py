from rest_framework import serializers
from social_auth.models import Profile
from social_auth.serializers.auth import ProfileSerializer
from social_co.models import Comment, Post


class CommentSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(read_only=True)
    post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all())

    class Meta:
        model = Comment
        depth = 1
        fields = ('id', 'author', 'content', 'post', 'created_at')

    def create(self, validated_data):
        request = self.context['request']

        return Comment.objects.create(author=request.user, **validated_data)