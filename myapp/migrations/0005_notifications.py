# Generated by Django 2.2.5 on 2019-10-08 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_favoritestocks'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notifications',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock', models.CharField(max_length=10)),
                ('type', models.CharField(max_length=10)),
            ],
        ),
    ]