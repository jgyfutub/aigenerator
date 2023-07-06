from rest_framework import serializers
class YourSerializer(serializers.Serializer):
    my_array = serializers.ListField()
