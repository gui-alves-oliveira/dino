import Menu from "./components/menu";

export function App() {
  return (
    <div>
      <Menu>
        <Menu.Trigger>hello</Menu.Trigger>

        <Menu.Popover>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
          <Menu.Item>Item 3</Menu.Item>
        </Menu.Popover>
      </Menu>
    </div>
  );
}
