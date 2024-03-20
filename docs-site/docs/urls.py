from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


from . import views

app_name = 'docs'


urlpatterns = [
    path('', views.index, name='index'),
    path('buttons/', views.buttons, name='buttons'),
    path('code/', views.code, name='code'),
    path('collapse/', views.collapse, name='collapse'),
    path('colors/', views.colors, name='colors'),
    path('forms/', views.forms, name='forms'),
    path('js_forms/', views.js_forms, name='js_forms'),
    path('icons/', views.icons, name='icons'),
    path('img/', views.img, name='img'),
    path('loader/', views.loader, name='loader'),
    path('mega_sidenav/', views.mega_sidenav, name='mega_sidenav'),
    path('modal/', views.modal, name='modal'),
    path('msgs/', views.msgs, name='msgs'),
    path('navbar-x/', views.navbar_x, name='navbar_x'),
    path('navbar-y/', views.navbar_y, name='navbar_y'),
    path('sidenav/', views.sidenav, name='sidenav'),
    path('tables/', views.tables, name='tables'),
    path('template/', views.template, name='template'),
    path('typography/', views.typography, name='typography'),
    path('utils/', views.utils, name='utils'),
    path('toast/', views.toast, name='toast'),
    path('tasks/', views.tasks, name='tasks'),
    path('slider/', views.slider, name='slider'),
    path('status/', views.status, name='status'),
    path('chips/', views.chips, name='chips'),
    path('pagination/', views.pagination, name='pagination'),
    path('breadcrumbs/', views.breadcrumbs, name='breadcrumbs'),
    path('progress-indicator/', views.progress_indicator, name='progress_indicator'),
    path('big-radio/', views.big_radio, name='big_radio'),
    path('component/', views.component, name='component'),
    path('show_hide_password/', views.show_hide_password, name='show_hide_password'),
    path('tile/', views.tile, name='tile'),
    path('select_all/', views.select_all, name='select_all'),
    path('select/', views.select, name='select'),
    path('lazy_images/', views.lazy_images, name='lazy_images'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
