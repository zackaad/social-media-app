from django.urls import path, include
from rest_framework.routers import DefaultRouter

from social_co.views.posts import PostViewSet
from social_co.views.comments import CommentViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='posts')
router.register(r'comments', CommentViewSet, basename='comments')


urlpatterns = [
    path('', include(router.urls)),
]
