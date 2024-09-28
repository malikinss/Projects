from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


# Main page
def index(request):
    return HttpResponse('Main Page')


# Group posts
def group_posts(request, slug):
    return HttpResponse(f'Group posts {slug}')
