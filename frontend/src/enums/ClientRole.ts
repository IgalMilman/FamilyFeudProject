export enum ClientRole {
    Host='ht',
    Viewer='vr',
    Participant='pt'
}

export function ClientRoleFromString(input?: string): ClientRole {
    switch (input) {
      case 'ht':
        return ClientRole.Host;
      case 'vr':
        return ClientRole.Viewer;
      case 'pt':
        return ClientRole.Participant;
    }
    return ClientRole.Viewer;
  }
  