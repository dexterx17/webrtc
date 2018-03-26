from flask import Flask, render_template, redirect, url_for, request, flash, jsonify


app = Flask(__name__)

@app.route('/')
@app.route('/restaurants')
def showRestaurants():
	return 'showRestaurants'

@app.route('/restaurant/new')
def newRestaurant():
	return 'newRestaurant'

@app.route('/restaurant/<int:restaurant_id>/edit')
def editRestaurant(restaurant_id):
	return 'editRestaurant %s ' % restaurant_id

@app.route('/restaurant/<int:restaurant_id>/delete')
def deleteRestaurant(restaurant_id):
	return 'deleteRestaurant %s' % restaurant_id 

@app.route('/restaurant/<int:restaurant_id>')
@app.route('/restaurant/<int:restaurant_id>/menu')
def showMenu(restaurant_id):
	return 'show menu de %s' %  restaurant_id

@app.route('/restaurant/<int:restaurant_id>/menu/new')
def newMenuItem(restaurant_id):
	return 'new menu item for %s' % restaurant_id

@app.route('/restaurant/<int:restaurant_id>/menu/<int:menu_id>/edit')
def editMenuItem(restaurant_id, menu_id):
	return 'edit menu item %s' % menu_id

@app.route('/restaurant/<int:restaurant_id>/menu/<int:menu_id>/delete')
def deleteMenuItem(restaurant_id, menu_id):
	return 'delete menu item %s' % menu_id
if __name__ == '__main__':
	app.secret_key = '23easf3sadf$#%!#'
	app.debug = True
	app.run(host = '0.0.0.0', port = 5000)