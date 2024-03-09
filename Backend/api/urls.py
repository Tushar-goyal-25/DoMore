from django.urls import path
from .views import *

urlpatterns = [
    path("getallcomments",getallpostcomments.as_view()),
    path("getallposts",getallpostusernameandlikes.as_view()),
    path("getunap",unaps.as_view()),
    path("getallusertoken",userwalletandclaim.as_view()),
]
