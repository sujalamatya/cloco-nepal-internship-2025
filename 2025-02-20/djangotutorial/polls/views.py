from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader_tags
from django.http import Http404
from .models import Questions
# Create your views here.

def index(request):
    latest_question_list = Questions.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "polls/index.html", context)

def detail(request,question_id):
    try:
        question=Questions.objects.get(pk=question_id)
    except Questions.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request,"polls/details.html",{"question":question})

def results(request,question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request , question_id):
    return HttpResponse("You're voting on question %s." % question_id)
