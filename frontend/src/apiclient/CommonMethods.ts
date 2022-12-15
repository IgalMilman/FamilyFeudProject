export const getCsrfToken = (): string => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, 10) === "csrftoken=") {
        cookieValue = decodeURIComponent(cookie.substring(10));
        break;
      }
    }
  }
  return cookieValue;
};

export const redirect = (url: string): void => {
  location.href = url;
};

export class Factory<T> {
  constructor(private type: new () => T) {}

  getNew(): T {
    return new this.type();
  }
}