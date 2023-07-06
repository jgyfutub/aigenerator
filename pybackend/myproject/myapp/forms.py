from django import forms
# from multiupload.fields import MultiFileField
class MyForm(forms.Form):
    images = forms.ImageField(widget=forms.ClearableFileInput(attrs={'multiple': True}))