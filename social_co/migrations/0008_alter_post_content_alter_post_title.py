# Generated by Django 5.0.4 on 2024-05-16 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("social_co", "0007_comment_author"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="content",
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name="post",
            name="title",
            field=models.CharField(blank=True, default=None, max_length=30, null=True),
        ),
    ]
