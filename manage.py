from flask_script import Manager
from flask_migrate import MigrateCommand
from application import create_app, db

app = create_app()
manager = Manager(app)

manager.add_option("-c", "--config", dest="config", required=False, )

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()
    db.session.commit()


if __name__ == '__main__':
    manager.run()
