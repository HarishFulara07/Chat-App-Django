from django.contrib import admin
from .models import Chat

class ChatAdmin(admin.ModelAdmin):
	list_display = ["user","__unicode__","timestamp"]


admin.site.register(Chat, ChatAdmin)