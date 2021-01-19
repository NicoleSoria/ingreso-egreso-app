
export class User {
    public nombre: string;
    public email: string;
    public uid: string;

    constructor( usuario: usuarioObj ){
        this.nombre = usuario ? usuario.nombre : null;
        this.email = usuario ? usuario.email : null;
        this.uid = usuario ? usuario.uid : null;
    }
}

interface usuarioObj {
    uid: string;
    email: string;
    nombre: string;
}