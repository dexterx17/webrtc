from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import cgi
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant, MenuItem

##inicializacion de base de datos
engine = create_engine('sqlite:///restaurant.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind = engine)
session = DBSession()

class webserverHandler(BaseHTTPRequestHandler):
	def do_GET(self):
		try:
			if self.path.endswith('/restaurants'):
				self.send_response(200)
				self.send_header('Content-type', 'text/html')
				self.end_headers()

				output = ""
				output += "<html><body>Restaurants list!</hr>"
				all_items = session.query(Restaurant).all()
				output += "<ul>"
				for item in all_items:
					output += ("<li> %s " % item.name)
					output += ("<a href='/restaurants/%i/edit' >Edit</a> " % item.id )
					output += ("<a href='/restaurants/%i/delete' >Delete</a>" % item.id )
					output += "</li>"
				output += "</ul>"
				output += "<a href='/restaurants/new'>New Restaurant</a> "
				output += "</body></html>"

				self.wfile.write(output)
				print output
				return
			if self.path.endswith('/restaurants/new'):
				self.send_response(200)
				self.send_header('Content-type', 'text/html')
				self.end_headers()

				output = ""
				output += "<html><body>New restaurant!</hr>"
				output += "<form method='POST' enctype='multipart/form-data' action='/restaurants/new'><h2>Info restaurant</h2><input name='name' type='text'><input type='submit' value='Submit'></form>"
				output += "</body></html>"

				self.wfile.write(output)
				print output
				return
			if self.path.endswith('/edit'):
				id = self.path.split("/")[2]

				self.send_response(200)
				self.send_header('Content-type','text/html')
				self.end_headers()

				resto = session.query(Restaurant).filter_by(id=id).one()

				output = ""
				output += "<html><body>Edit restaurant!</hr>"
				output += ("<form method='POST' enctype='multipart/form-data' action='/restaurants/%i/edit'><h2>Info restaurant</h2><input name='name' type='text' value='%s'><input type='submit' value='Submit'></form>" % (resto.id, resto.name))
				output += "</body></html>"

				self.wfile.write(output)
				print output
				return
			if self.path.endswith('/delete'):
				id = self.path.split("/")[2]

				self.send_response(200)
				self.send_header('Content-type','text/html')
				self.end_headers()

				resto = session.query(Restaurant).filter_by(id=id).one()

				output = ""
				output += "<html><body>Eliminar restaurant!</hr>"
				output += ("<form method='POST' enctype='multipart/form-data' action='/restaurants/%i/delete'><h2>Eliminar restaurant</h2><h1>Esta seguro de eliminar <small>%s</small></h1><input type='submit' value='Submit'></form>" % (resto.id, resto.name))
				output += "</body></html>"

				self.wfile.write(output)
				print output
				return

		except IOError:
			self.send_error(404, "File not found %s" % self.path)	
	def do_POST(self):
		try:
			if self.path.endswith('/delete'):				
				id = self.path.split("/")[2]
				
				resto = session.query(Restaurant).filter_by(id = id).one()

				if( resto != []):
					session.delete(resto)
					session.commit()

				self.send_response(301)
				self.send_header('Content-type', 'text/html')
				self.send_header('Location', '/restaurants')
				self.end_headers()

			if self.path.endswith('/edit'):				
				id = self.path.split("/")[2]
				ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
				if ctype == 'multipart/form-data':
					fields = cgi.parse_multipart(self.rfile, pdict)
					name = fields.get('name')
					resto = session.query(Restaurant).filter_by(id = id).one()
					if( resto != []):
						resto.name = name[0]
						session.add(resto)
						session.commit()

					self.send_response(301)
					self.send_header('Content-type', 'text/html')
					self.send_header('Location', '/restaurants')
					self.end_headers()

			if self.path.endswith('/restaurants/new'):				
				ctype, pdict = cgi.parse_header(self.headers.getheader('content-type'))
				if ctype == 'multipart/form-data':
					fields = cgi.parse_multipart(self.rfile, pdict)
					name = fields.get('name')
					resto = Restaurant(name=name[0])
					session.add(resto)
					session.commit()

					self.send_response(301)
					self.send_header('Content-type', 'text/html')
					self.send_header('Location', '/restaurants')
					self.end_headers()

		except:
			pass
def main():
	try:
		port = 8080
		server = HTTPServer(('127.0.0.1',port), webserverHandler)
		print "Web server running on port %s" % port
		server.serve_forever()

	except KeyboardInterrupt:
		print "^C entered, stopping web server..."
		server.socket.close()

if __name__ == '__main__':
	main()