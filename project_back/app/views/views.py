from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters
from app.models import Location, Cinema, Movie, Review, FilmManager, Ticket
from app.serializers import UserSerializer, RegisterSerializer, LocationSerializer, CinemaSerializer, MovieSerializer, ReviewSerializer, TicketSerializer
from django.shortcuts import get_object_or_404
from django.shortcuts import render


@api_view(['GET', 'POST'])
def locations_view(request):
    permission_classes = (AllowAny,)

    if request.method == 'GET':
        locations = Location.objects.all()
        serializer = LocationSerializer(locations, many=True)
        return Response(serializer.data, status=200)
    elif request.method == 'POST':
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=500)


@api_view(['GET', 'PUT', 'DELETE'])
def location_view(request, pk):
    permission_classes = (AllowAny,)

    location = get_object_or_404(Location, pk=pk)
    if request.method == 'GET':
        serializer = LocationSerializer(location)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = LocationSerializer(instance=location, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'DELETE':
        location.delete()
        return Response(status=204)


class Cinemas(APIView):
    permission_classes = (AllowAny,)

    filter_backends = (filters.OrderingFilter,)
    ordering = ('name', )

    def get(self, request, pk):
        location = get_object_or_404(Location, pk=pk)
        cinemas = location.cinemas.all()
        serializer = CinemaSerializer(cinemas, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        serializer = CinemaSerializer(data=request.data)
        if serializer.is_valid():
            location = get_object_or_404(Location, id=self.kwargs['pk'])
            serializer.save(location=location)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=500)


class CinemaView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, pk):
        cinema = get_object_or_404(Cinema, pk=pk)
        serializer = CinemaSerializer(cinema)
        return Response(serializer.data)

    def put(self, request, pk):
        cinema = get_object_or_404(Cinema, pk=pk)
        serializer = CinemaSerializer(
            instance=cinema, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

    def delete(self, request, pk):
        cinema = get_object_or_404(Cinema, pk=pk)
        cinema.delete()
        return Response(status=204)


class Movies(generics.ListCreateAPIView):
    serializer_class = MovieSerializer
    filter_backends = (filters.OrderingFilter,)
    ordering = ('price',)

    def get_queryset(self):
        return Movie.objects.filter(cinema=self.kwargs['pk'])

    def perform_create(self, serializer):
        cinema = get_object_or_404(Movie, id=self.kwargs['pk'])
        serializer.save(cinema=cinema)


class MovieView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class Reviews(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(cinema=self.kwargs['pk'])

    def perform_create(self, serializer):
        cinema = get_object_or_404(Cinema, id=self.kwargs['pk'])
        serializer.save(user=self.request.user, cinema=cinema)


class Tickets(generics.ListCreateAPIView):
    serializer_class = TicketSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Ticket.objects.for_user(self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TicketView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = (IsAuthenticated,)


class Clearer(APIView):
    permission_classes = (IsAuthenticated,)

    def delete(self, request):
        Ticket.objects.filter(user=request.user).delete()
        return Response(status=204)


def description(request):
    return render(request, 'api.html')

