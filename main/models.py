from django.db import models


class Titul(models.Model):
    name = models.CharField(max_length=255)


class Team(models.Model):
    name = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    tituls = models.ForeignKey("Titul", on_delete=models.CASCADE)
    coach = models.CharField(max_length=255)


class Calendar(models.Model):
    date_of_the_match = models.DateField()
    teams = models.ForeignKey("Team", on_delete=models.CASCADE)
    main_judge = models.CharField(max_length=100)
    result = models.CharField(max_length=5)


# Команда название, страна, город, титулы, тренер.
# Календарь: дата проведения матча, идентификаторы команд-участников, главный судья, результат.
# Титул: наименование.
