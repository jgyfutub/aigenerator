from django.urls import path
from . import views
urlpattern=[
    path('',views.index,name='index'),
    path('neuralstyletransfer/',views.ReactView.as_view(),name='neuralstyletransfer')
]