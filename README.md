#Canal de comunicacion para Teleoperacion

La construccion de esta canal se dividio en 3 etapas

1)Canal TCP-IP
2)Canal websocket
3)Canal ROS

## Canal websocket

Para levantar el servidor del canal de comunicacion se utilizo NODEJS 10 
el canal permite la comunicacion entre N plataformas y N controladores y N visualizadores

-Mensaje de identificacion (id)
	{"ev":"id","client":"","tipo":"controlador"}
	"tipo" pueder ser: controller, platform, viewer
	"client" puede ser: kunka, drone, celu, etc
-Mensaje de instruccion (inst)
	{"ev":"inst","val1":"0","val2":"0","valn":"0"}
-Mensaje de estado (stat)
	{"ev":"stat","val1":"0","val2":"0","valn":"0"}

