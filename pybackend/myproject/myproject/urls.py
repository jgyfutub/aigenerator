"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from myapp import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index,name='index'),
    path('neuralstyletransfer/',views.ReactView.as_view(),name='neuralstyletransfer'),
    path('savedimages/',views.ImagesView.as_view(),name='savedimages'),
    path('texttoimage/',views.TexttoImage.as_view(),name='textoimage'),
    path('savedenhancedimages/',views.EnhancedImageView.as_view(),name='savedenhancedimages'),
    path('monetgenerator/',views.MonetImagegenerator.as_view(),name='monetgenerator'),
    path('savedmonetimages/',views.MonetImageView.as_view(),name='savedmonetimages')
]
