import { APIResponse } from "./models/APIResponse";

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

export async function sendGetRequestAndRecieveDataObject<T>(
  url: string,
  factory: Factory<T>
): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: this.generateHeaders(),
  });
  if (response.status != 200) {
    console.log(`Could not fetch data. ${response.body}`);
    return null;
  }
  const jsonobject = await response.json();
  const result: T = Object.assign(factory.getNew(), jsonobject);
  return result;
}

export async function sendGetRequestAndRecieveDataArray<T>(
  url: string,
  factory: Factory<T>
): Promise<T[]> {
  const response = await fetch(url, {
    method: "GET",
    headers: this.generateHeaders(),
  });
  if (response.status != 200) {
    console.log(`Could not fetch data. ${response.body}`);
    return null;
  }
  const jsonobject: Array<{}> = await response.json();
  const result: T[] = jsonobject.map<T>((value) =>
    Object.assign(factory.getNew(), value)
  );
  return result;
}

export async function sendPutRequestAndReieveAnswer<TInput, TOutput>(
  url: string,
  data: TInput
): Promise<APIResponse<TOutput>> {
  const response = await fetch(
    url,
    {
      method: "PUT",
      headers: this.generateHeaders(),
      body: JSON.stringify(data),
    }
  );
  if (response.status == 200 || response.status == 403) {
    const jsonobject = await response.json();
    const result: APIResponse<TOutput> = Object.assign(
      new APIResponse<TOutput>(),
      jsonobject
    );
    return result;
  }
  console.log(`Could not upsert data. ${response.body}`);
  return null;
}
