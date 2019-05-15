from django.urls import path
from app import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('locations/', views.locations_view),
    path('locations/<int:pk>/', views.location_view),
    path('locations/<int:pk>/cinemas/', views.Cinemas.as_view()),
    path('cinemas/<int:pk>/', views.CinemaView.as_view()),
    path('cinemas/<int:pk>/movies/', views.Movies.as_view()),
    path('movies/<int:pk>/', views.MovieView.as_view()),
    path('cinemas/<int:pk>/reviews/', views.Reviews.as_view()),
    path('tickets/', views.Tickets.as_view()),
    path('tickets/<int:pk>/', views.TicketView.as_view()),
    path('clear/', views.Clearer.as_view()),
    path('users/', views.UserList.as_view()),
    path('', views.description),
    path('login/', views.login),
    path('logout/', views.logout),
    path('register/', csrf_exempt(views.Register.as_view())),
]
