from django.urls import path
from .views import *

urlpatterns = [
    path("getcomments",getallpostcomments.as_view()),
    path("getallposts",getallpostusernameandlikes.as_view()),
]
