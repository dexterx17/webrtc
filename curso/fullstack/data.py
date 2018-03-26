from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

##inicializacion de base de datos
engine = create_engine('sqlite:///restaurant.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind = engine)
session = DBSession()

##Creating new restaurant
myFirstResto = Restaurant(name ="Dex rest")
session.add(myFirstResto)
session.commit()
session.query(Restaurant).all()

##Creating new MenuItem
pizza = MenuItem(name ="Pizza", description="italian pizza", course="Entree", price = "$8.99", restaurant = myFirstResto)
session.add(pizza)
session.commit()
session.query(MenuItem).all()