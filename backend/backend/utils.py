from user.serializers import UserSerializer, GroupSerializer
from datetime import datetime
from rest_framework_jwt.settings import api_settings
from calendar import timegm


def jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        **UserSerializer(user, context={'request': request}).data
    }


def jwt_payload_handler(user):
    payload = {
        **UserSerializer(user).data,
        'exp': (datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA),
    }

    # Include original issued at time for a brand new token,
    # to allow token refresh
    if api_settings.JWT_ALLOW_REFRESH:
        payload['orig_iat'] = timegm(
            datetime.utcnow().utctimetuple()
        )

    if api_settings.JWT_AUDIENCE is not None:
        payload['aud'] = api_settings.JWT_AUDIENCE

    if api_settings.JWT_ISSUER is not None:
        payload['iss'] = api_settings.JWT_ISSUER

    return payload
