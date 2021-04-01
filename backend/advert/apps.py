from django.apps import AppConfig


class AdvertConfig(AppConfig):
    name = 'advert'

    def ready(self):
        from django_q.models import Schedule
        try:
            task = Schedule.objects.get(name="Deactivate expired ads")
        except Schedule.DoesNotExist:
            Schedule.objects.create(
                name="Deactivate expired ads",
                func="advert.tasks.deactivate_expired_ads",
                schedule_type=Schedule.DAILY,
                repeats=-1
            )
