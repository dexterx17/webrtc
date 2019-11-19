#!/usr/bin/python
#import websocket
import websocket
import thread
import time
import random
import json

dato_inicial={'com':0,'valorx':0,'valory':0,'valorz':0,'errorx':0,'errory':0,'errorz':0,'control':4}
def on_message(ws, message):
	print ("MENSAJE RECIBIDO DESDE LA PLATAFORM")
	print (message)

def on_error(ws, error):
    print (error)

def on_close(ws):
    print ("### closed ###")

def on_open(ws):
    def run(*args):
        ws.send('{"cliente":"controlador"}')
        time.sleep(1)
        ws.send(json.dumps(dato_inicial))
        for i in range(100):
            time.sleep(1)
            dato={'com':random.randint(0,100),
				'valorx':random.randint(0,100),
				'valory':random.randint(0,100),
				'valorz':random.randint(0,100),
				'errorx':random.randint(0,100),
				'errory':random.randint(0,100),
				'errorz':random.randint(0,100),
				'control':random.randint(0,4)
				}
            ws.send(json.dumps(dato))
            print ("DATO ENVIADO DESDE CONTROLADOR CORRECTAMENTE!")
        time.sleep(1)
        ws.close()
        print ("thread terminating...")
    thread.start_new_thread(run, ())


if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://10.211.159.17:9001",
                                on_message = on_message,
                                on_error = on_error,
                                on_close = on_close)
    ws.on_open = on_open

    ws.run_forever(sslopt={"cert_reqs": ssl.CERT_NONE})