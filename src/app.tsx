import Menu from "./components/menu";

export function App() {
  const handleClick = () => {
    console.log("this is my client click");
  };

  return (
    <div>
      <Menu>
        <Menu.Trigger onClick={handleClick}>hello</Menu.Trigger>

        <Menu.Popover>
          <Menu.Item onClick={() => console.log("item 1")}>Item 1</Menu.Item>
          <Menu.Item onClick={() => console.log("item 2")}>Item 2</Menu.Item>
          <Menu.Item onClick={() => console.log("item 3")}>Item 3</Menu.Item>
        </Menu.Popover>
      </Menu>

      <button>oi</button>
    </div>
  );
}
