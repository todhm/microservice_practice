from project import db
from project.api.models import User
import json


def add_user(username, email, password):
    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return user


def add_user_login(client, username, email, password):
    add_user(username, email, password)
    resp_login = client.post(
        '/auth/login',
        data=json.dumps({
            'email': email,
            'password': password
        }),
        content_type='application/json'
    )
    token = json.loads(resp_login.data.decode())['auth_token']
    return token


def update_admin(email):
    user = User.query.filter_by(email='test@test.com').first()
    user.admin = True
    db.session.commit()
