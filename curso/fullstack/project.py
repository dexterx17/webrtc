from flask import Flask, render_template, redirect, url_for, request, flash, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

app = Flask(__name__)

##inicializacion de base de datos
engine = create_engine('sqlite:///restaurant.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind = engine)
session = DBSession()

@app.route('/')
#API
@app.route('/restaurants/<int:restaurant_id>/menu/JSON')
def restaurantMenuJSON(restaurant_id):
	#restaurant = session.query(Restaurant).filter_by(id = restaurant_id).one()
	items = session.query(MenuItem).filter_by(restaurant_id=restaurant_id).all()
	return jsonify(MenuItems=[i.serialize for i in items])

@app.route('/restaurants/<int:restaurant_id>/items/<int:menu_id>/JSON')
def menuItemJSON(restaurant_id, menu_id):
	item = session.query(MenuItem).filter_by(id=menu_id).one()
	return jsonify(MenuItem = item.serialize)

@app.route('/restaurants/<int:restaurant_id>/menu')
def restaurantMenu(restaurant_id):
	restaurant = session.query(Restaurant).filter_by(id=restaurant_id).one()
	print "RESTO"
	print restaurant.name
	all_items = session.query(MenuItem).filter_by(restaurant_id=restaurant_id)
	return render_template('menu.html', restaurant=restaurant, items=all_items)

# Task 1: Create route for newMenuItem function here
@app.route('/restaurants/<int:restaurant_id>/items/new', methods=['GET','POST'])
def newMenuItem(restaurant_id):
	if request.method == 'POST':
		newItem = MenuItem(name=request.form['name'], restaurant_id = restaurant_id)
		session.add(newItem)
		session.commit()
		flash('New menu item has been created!')
		return redirect(url_for('restaurantMenu', restaurant_id=restaurant_id))
	else:
		return render_template('newmenuitem.html',restaurant_id = restaurant_id)

# Task 2: Create route for editMenuItem function here
@app.route('/restaurants/<int:restaurant_id>/items/<int:menu_id>/edit', methods=['GET','POST'])
def editMenuItem(restaurant_id, menu_id):
	editedItem = session.query(MenuItem).filter_by(id = menu_id).one()
	if request.method == 'POST':
		if request.form['name']:
			editedItem.name= request.form['name']
		session.add(editedItem)
		session.commit()
		flash('Menu item has been updated!')
		return redirect(url_for('restaurantMenu', restaurant_id=restaurant_id))
	else:
		return render_template('editmenuitem.html',restaurant_id=restaurant_id, menu_id=menu_id, i=editedItem)

# Task 3: Create a route for deleteMenuItem function here
@app.route('/restaurants/<int:restaurant_id>/items/<int:menu_id>/delete', methods=['GET','POST'])
def deleteMenuItem(restaurant_id, menu_id):
	deletedItem = session.query(MenuItem).filter_by(id = menu_id).one()
	if request.method == 'POST':
		session.delete(deletedItem)
		session.commit()
		flash('Menu item has been deleted!')
		return redirect(url_for('restaurantMenu', restaurant_id=restaurant_id))
	else:
		return render_template('deletemenuitem.html',i=deletedItem, restaurant_id=restaurant_id)

if __name__ == '__main__':
	app.secret_key = '23easf3sadf$#%!#'
	app.debug = True
	app.run(host = '0.0.0.0', port = 5000)