from django.db import models

# Create your models here.
from django.db import models
from django.core.exceptions import ValidationError

#functions
def no_spaces_validator(val):
    if ' ' in val:
        raise ValidationError("spaces not allowed in this field!")

def solanapubkeyvalidator(val):
    if val[0] != "S":
        raise ValidationError("Public key invalid!")
    if len(val) != 44:
        raise ValidationError("Public key invalid!")
 
# Create your models here.

class user(models.Model):
    user_id = models.AutoField(primary_key=True)
    userName= models.CharField(max_length=32,validators = [no_spaces_validator])
    user_pfp = models.ImageField(upload_to="user_pfps/", blank=True)
    user_tokens_owed = models.IntegerField()
    user_wallet_pubkey = models.CharField(max_length=44,validators=[solanapubkeyvalidator])

class unap(models.Model):
    user_id=models.ForeignKey(user,on_delete=models.CASCADE,primary_key = True,related_name="unap_user_id")
    userName=models.ForeignKey(user,on_delete = models.CASCADE)
    password = models.TextField(validators=[no_spaces_validator],null = False)
class challenge(models.Model):
    challenge_id = models.AutoField(primary_key=True)
    challenge_title = models.TextField()
    challenge_text = models.TextField()
    challenge_enddate = models.DateTimeField(auto_now=False, auto_now_add=False, null = False)
    
class post(models.Model):
    post_id = models.AutoField(primary_key= True)
    post_text = models.TextField()
    post_image = models.ImageField( upload_to="user_posts/",blank=False)
    post_likes = models.IntegerField()
    post_time = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(user,on_delete=models.CASCADE)
    challenge_id = models.ForeignKey(challenge,on_delete=models.CASCADE)

class userLikes(models.Model):
    post_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(user,on_delete=models.CASCADE)
    class Meta:
        unique_together = ["post_id","user_id"]

class userComments(models.Model):
    comment_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(user,on_delete=models.CASCADE)
    post_id = models.ForeignKey(post,on_delete = models.CASCADE)
    comment_text = models.TextField(null=False)

class userPrize(models.Model):
    user_id = models.ForeignKey(user,on_delete=models.CASCADE)
    challenge_id = models.ForeignKey(challenge,on_delete=models.CASCADE)
    tokens_owed = models.IntegerField()
    user_tokens_updated = models.BooleanField(default=False)
    class Meta:
        unique_together= ['user_id','challenge_id']