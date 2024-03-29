import { trpc } from "../../../Application/utils/trpc";
import reactLogo from "../../assets/react.svg";
import { Button, DatePicker, Space, version } from "antd";

function HomeComponent() {

  const examples = trpc.example.getAll.useQuery();
  const utils = trpc.useContext();
  const addExample = trpc.example.add.useMutation({
    async onSuccess() {
      await utils.example.getAll.invalidate();
    }
  });
  const removeExample = trpc.example.remove.useMutation({
    async onSuccess() {
      await utils.example.getAll.invalidate();
    }
  });
  const greeting = trpc.greeting.useQuery({ name: "Nicky" });


  return (
    <div className="App">a
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Space>
        <DatePicker />
        <Button type="primary">Primary Button</Button>
      </Space>
      <p>{greeting.data}</p>
      <button onClick={() => addExample.mutate()}>ADD example</button>
      <ul>
        {examples.data?.map((example, idx) => {
          return (
            <li
              key={idx}
              className="example"
              onClick={() => {
                removeExample.mutate({ id: example.id });
              }}
            >
              <span>{example.id}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomeComponent;
