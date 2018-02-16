function section_cliente(data){
    var icon = 'hearing';
    if(data.connected === 'controlador')
        icon = 'settings_remote';
    if(data.connected === 'plataforma')
        icon = 'my_location';
    
    var section ='<a href="javascript:void(0)" id="cliente' + data.ip + '" class="chat-message"><div class="chat-item"><div class="chat-item-image"><i class="material-icons">'+icon;
    section += '</i></div><div class="chat-item-info"><p class="chat-name">' + data.connected + '</p>';
    section += '<span class="chat-message">' + data.ip + '</span></div></div></a>';
    return section;
}