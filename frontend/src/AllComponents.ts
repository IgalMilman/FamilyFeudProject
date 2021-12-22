import { GameContent } from "./GameContent";
import { HostSettings } from "./HostSettings";
import { LoginForm } from "./LoginForm";

export const AllComponentsList: {
  tag: string;
  element: (props: any) => JSX.Element;
}[] = [
  {
    tag: "game-content",
    element: GameContent,
  },
  {
    tag: "login-form",
    element: LoginForm,
  },
  {
    tag: "host-settings",
    element: HostSettings,
  },
];
