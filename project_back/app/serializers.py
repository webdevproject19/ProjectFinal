from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import BCryptSHA256PasswordHasher
from app.models import Location, Cinema, Movie, Review, FilmManager, Ticket


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'email', 'is_staff')



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    encoder = BCryptSHA256PasswordHasher()

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name')

    def create(self, validated_data):
        password = validated_data.pop('password')
        hashed_password = self.encoder.encode(
            password, salt=self.encoder.salt())
        user = User.objects.create(password=hashed_password, **validated_data)
        user.save()
        return user
        

class LocationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    def create(self, validated_data):
        section = Location(**validated_data)
        section.save()
        return section

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class CinemaSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    image_url = serializers.CharField(required=True)
    contact = serializers.CharField(required=True)
    location = LocationSerializer(read_only=True)

    def create(self, validated_data):
        restaurant = Cinema(**validated_data)
        restaurant.save()
        return restaurant

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class MovieSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    image_url = serializers.CharField(required=True)
    price = serializers.IntegerField(required=True)
    cinema = CinemaSerializer(read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField(required=True)
    user = UserSerializer(read_only=True)
    cinema = CinemaSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'


class TicketSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    movie_name = serializers.CharField(required=True)
    count = serializers.IntegerField(required=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'
