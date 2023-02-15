from django.db import models


class Titul(models.Model):
    name = models.CharField(max_length=255)


class Team(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    tituls = models.ManyToManyField("Titul")
    coach = models.CharField(max_length=255)


class Calendar(models.Model):
    date_of_the_match = models.DateField()
    teams = models.ManyToManyField("Team")
    main_judge = models.CharField(max_length=100)
    result = models.CharField(max_length=5, null=True, default=None)


# Команда название, страна, город, титулы, тренер.
# Календарь: дата проведения матча, идентификаторы команд-участников, главный судья, результат.
# Титул: наименование.
