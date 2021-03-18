export class UserCreatedEvent {
  constructor(public readonly username: string) {
    // TODO: Enviar E-mail ao usuário sobre reserva
    console.log('Enviando e-mail para o usuário...');
  }
}
