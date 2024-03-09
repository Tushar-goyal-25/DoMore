# Generated by Django 4.2 on 2024-03-09 20:09

import api.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='unap',
            fields=[
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='unap_user_id', serialize=False, to='api.user')),
                ('password', models.TextField(validators=[api.models.no_spaces_validator])),
                ('userName', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
