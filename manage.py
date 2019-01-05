from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from application import app, db

manager = Manager(app)

migrate = Migrate(app, db)
manager.add_option("-c", "--config", dest="config", required=False)

# migrations
manager.add_command('db', MigrateCommand)


@manager.command
def create_db():
    """Creates the db tables."""
    db.create_all()

if __name__ == '__main__':
    manager.run()