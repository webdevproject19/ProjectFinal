from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from rest_framework import generics
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from app.serializers import UserSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )

class Register(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class UserInfo(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.request.user


@api_view(['POST'])
def logout(request):
    request.auth.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    user_info = User.objects.get(username=user)
    serializer = UserSerializer(user_info) 
    name = serializer.data['first_name']
    is_admin = serializer.data['is_staff']
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key})
