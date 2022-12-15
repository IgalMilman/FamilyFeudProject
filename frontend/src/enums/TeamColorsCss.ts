export function getBackgroundCssClassForTeam(
  teamnumber: 1 | 2 | undefined | null
): string {
  if (teamnumber) {
    if (teamnumber == 1) {
      return "team1background";
    }
    if (teamnumber == 2) {
      return "team2background";
    }
  }
  return undefined;
}

export function getBorderCssClassForTeam(
  teamnumber: 1 | 2 | undefined | null
): string {
  if (teamnumber) {
    if (teamnumber == 1) {
      return "team1border";
    }
    if (teamnumber == 2) {
      return "team2border";
    }
  }
  return undefined;
}

export function getBackgroundColorForTeam(
    teamnumber: 1| 2|undefined|null
){
    if (teamnumber) {
      if (teamnumber == 1) {
        return "team1background";
      }
      if (teamnumber == 2) {
        return "team2background";
      }
    }
    return undefined;
}