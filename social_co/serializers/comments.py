from rest_framework import serializers
from social_auth.models import Profile
from social_auth.serializers.auth import ProfileSerializer
from social_co.models import Post
from rest_framework.serializers import CurrentUserDefault


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'author', 'content', 'post_id')

    def create(self, validated_data):
        request = self.context['request']

        return Post.objects.create(author=request.user, **validated_data)
