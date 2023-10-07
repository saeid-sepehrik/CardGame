import { Divider, List, Modal, Skeleton, Button } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { setMessages, updateMessage } from "./player.slice";
import { IMessage } from "../../models/models";
import { useTranslation } from "react-i18next";

export interface MessageProps {
  openModalMessage: boolean;
  setopenModalMessage: (openModalMessage: boolean) => void;
}
export const Message = ({
  openModalMessage,
  setopenModalMessage,
}: MessageProps) => {
  const dispatch = useAppDispatch();
  const playerSelector = useAppSelector((s) => s.player);
  const { t } = useTranslation();

  const loadMoreData = () => {
    // if (playerSelector.loading) {
    //   return;
    // }
    // dispatch(setloading(true));
    dispatch(setMessages());
  };

  const submitAction = (message: IMessage, action: string) => {
    dispatch(updateMessage({ ...message, action: action, read: true }));
  };

  const handleCancelModalMessage = () => {
    setopenModalMessage(false);
  };

  const handleOkModalMessage = () => {
    setopenModalMessage(false);
  };
  return (
    <>
      <Modal
        title={playerSelector.dataPlayer.name}
        open={openModalMessage}
        onOk={handleOkModalMessage}
        onCancel={handleCancelModalMessage}
        footer={[
          <Button key="close" onClick={handleCancelModalMessage}>
            {t("button.close")}
          </Button>,
        ]}
      >
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={playerSelector.dataMessages.length}
            next={loadMoreData}
            hasMore={playerSelector.dataMessages.length > 10}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={
              <Divider plain>{t("common.label.notMoreMessage")}</Divider>
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={playerSelector.dataMessages}
              renderItem={(item) => (
                <List.Item
                  style={{
                    backgroundColor: `${
                      item.read === false ? "#cbe7dd" : "#f6f6f6"
                    }`,
                    padding: 10,
                    margin: "5px 0",
                  }}
                  key={item.text}
                >
                  <List.Item.Meta title={<>{item.text}</>} />
                  {/*  */}
                  <div>
                    {!item.read && (
                      <>
                        <Button>
                          <DislikeOutlined
                            onClick={() =>
                              submitAction(item, "DislikeOutlined")
                            }
                            style={{ color: "red" }}
                          />
                        </Button>
                        <Button>
                          <LikeOutlined
                            onClick={() => submitAction(item, "LikeOutlined")}
                            style={{ color: "green" }}
                          />
                        </Button>
                      </>
                    )}
                    {item.read && (
                      <>
                        {item.action === "DislikeOutlined" && (
                          <DislikeOutlined style={{ color: "red" }} />
                        )}
                        {item.action === "LikeOutlined" && (
                          <LikeOutlined style={{ color: "green" }} />
                        )}
                      </>
                    )}
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Modal>
    </>
  );
};
