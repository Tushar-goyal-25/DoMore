from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from .models import *
from .serializers import *

class getpostcomments(APIView):
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
    
