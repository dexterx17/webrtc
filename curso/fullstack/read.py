from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

##inicializacion de base de datos
engine = create_engine('sqlite:///restaurant.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind = engine)
session = DBSession()

firstResto = session.query(Restaurant).first()
print firstResto

all_items = session.query(Restaurant).all()

print all_items

for item in all_items:
	print item.name

item_upd = session.query(MenuItem).filter_by(id=4).one()

print
print item_upd.price

item_upd.price = "$9.99"

session.add(item_upd)
session.commit()

print item_upd.price

session.delete(item_upd)
session.commit()

print
print 'deleted'
print item_upd.price