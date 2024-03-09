from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from .models import *
from .serializers import *

class getallpostcomments(APIView):
    def get(self, request):
        objs = userComments.objects.filter()
        uis = []
        for i in objs:
            ids = i.user_id.user_id
            if ids not in uis:
                uis.append(ids)
        objs1 = user.objects.filter(user_id__in = uis)
        jsone=[]
        for i in objs1:
            usercoms = objs.filter(user_id = i.user_id)
            for j in usercoms:
                ind={}
                ind["username"] = i.userName
                ind["comment"] = j.comment_text
                jsone.append(ind)
        return JsonResponse(jsone,safe = False)
    
class unaps(APIView):
    def get(self,request):
        objs = unap.objects.all()
        mains=[]
        for i in objs:
            js = {}
            js["username"]=i.userName.userName
            js["password"]=i.password
            mains.append(js)
        return JsonResponse(mains,safe=False)

class getallpostusernameandlikes(APIView):
    def get_image_url(self, image_field):
        if image_field and hasattr(image_field, 'url'):
            return image_field.url
        return None
    def get(self,request):
        objs = post.objects.filter()
        mains = []
        for i in objs:
            jsone={}
            jsone["post_id"]=i.post_id
            jsone["post_text"]= i.post_text
            jsone["post_likes"]=i.post_likes
            jsone["image_src"]="backend/media"+self.get_image_url(i.post_image)
            usern = user.objects.get(user_id = i.user_id.user_id)
            jsone['username']=usern.userName
            mains.append(jsone)
        return JsonResponse(mains,safe=False)