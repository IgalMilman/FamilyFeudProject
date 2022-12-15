export enum ClientRole {
    Host='ht',
    Viewer='vr',
    Participant='pt',
    ViewerParticipant='vp',
    Undefined='un'
}

export function ClientRoleFromString(input?: string): ClientRole {
    switch (input) {
      case 'ht':
        return ClientRole.Host;
      case 'vr':
        return ClientRole.Viewer;
      case 'vp':
        return ClientRole.ViewerParticipant;
      case 'pt':
        return ClientRole.Participant;
    }
    return ClientRole.Viewer;
  }
  
export function GetFixedClientRole(input: ClientRole): ClientRole {
  switch (input) {
    case ClientRole.ViewerParticipant:
    case ClientRole.Undefined:
      return ClientRole.Viewer;
  }
  return input;
}