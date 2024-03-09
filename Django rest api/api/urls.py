from django.urls import path
from .views import *

urlpatterns = [
    path("getcomments",getpostcomments.as_view()),
]
