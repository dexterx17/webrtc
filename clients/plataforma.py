#!/usr/bin/python
import websocket
import thread
import time
import random
import json

def on_message(ws, message):
	print ("MENSAJE RECIBIDO DESDE EL CONTROLADOR")
	print (message)

def on_error(ws, error):
    print (error)

def on_close(ws):
    print ("### closed ###")

def on_open(ws):
    def run(*args):
    	#time.sleep(1)
        ws.send('{"cliente":"plataforma"}')
        for i in range(100):
            #time.sleep(0.5)
            time.sleep(1)
            dato={'ok':random.randint(0,100),
				'valorx':random.randint(0,100),
				'valory':random.randint(0,100),
				'teta':random.randint(0,100),
				'q1':random.randint(0,100),
				'q2':random.randint(0,100),
				'q3':random.randint(0,100),
				'q4':random.randint(0,100),
				'ftang':random.randint(0,100),
				'fnormal':random.randint(0,100)
				}
            ws.send(json.dumps(dato))
            print ("DATO ENVIADO DESDE PLATAFORMA CORRECTAMENTE!")
        time.sleep(1)
        ws.close()
        print ("thread terminating...")
    thread.start_new_thread(run, ())


if __name__ == "__main__":
    #websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://201.159.223.139:9001",
                                on_message = on_message,
                                on_error = on_error,
                                on_close = on_close)
    ws.on_open = on_open

    ws.run_forever()
