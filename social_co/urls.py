from django.urls import path, include
from rest_framework.routers import DefaultRouter

from social_co.views.posts import PostViewSet
from social_co.views.comments import CommentViewSet
from social_co.views.profile import ProfileViewSet, ProfilePostsAPIView, ProfileCommentsAPIView

router = DefaultRouter()
router.register('posts', PostViewSet, basename='posts')
router.register('comments', CommentViewSet, basename='comments')
router.register('profiles', ProfileViewSet, basename='profiles')


urlpatterns = [
    path('', include(router.urls)),
    path('profiles/me/posts/', ProfilePostsAPIView.as_view()),
    path('profiles/me/comments/', ProfileCommentsAPIView.as_view())
]
