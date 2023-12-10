import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
  Panel,
  PanelHeader,
  FormLayout,
  FormItem,
  Input,
  Button,
  Title,
  Text,
  Div,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

function App() {
  const [activePanel, setActivePanel] = useState("home");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(<ScreenSpinner size="large" />);

  const [postText, setPostText] = useState("");
  const [getText, setGetText] = useState("");

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  async function post() {
    // e.preventDefault();
    try {
      const response = await fetch("https://<POST_URL>", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: fetchedUser.id,
          text: postText,
        }),
      });
      if (response.ok) {
        const data = response.json();
        console.log(data);
      } else {
        console.log(`HTTP Error ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function get() {
    // e.preventDefault();
    try {
      const response = await fetch("https://<GET_URL>");
      if (response.ok) {
        const data = response.json();
        setGetText(data.text);
      } else {
        console.log(`HTTP Error ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Panel id="home">
                  <PanelHeader>backend-test-app</PanelHeader>
                  <Div>
                    <Title>post-test</Title>
                    <FormLayout>
                      <FormItem top="sended text" htmlFor="posttext">
                        <Input
                          id="posttext"
                          type="text"
                          onChange={(e) => {
                            setPostText(e.target.value);
                          }}
                        />
                      </FormItem>
                    </FormLayout>
                    <Button
                      stretched={true}
                      onClick={post}
                      style={{
                        marginTop: 10,
                      }}
                    >
                      POST
                    </Button>
                  </Div>
                  <Div>
                    <Title>get-test</Title>
                    <Text
                      style={{
                        marginTop: 10,
                      }}
                    >
                      {getText || "click the button bellow to get the text"}
                    </Text>
                    <Button
                      stretched={true}
                      onClick={get}
                      style={{
                        marginTop: 10,
                      }}
                    >
                      GET
                    </Button>
                  </Div>
                </Panel>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
