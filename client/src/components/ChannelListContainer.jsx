import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import Cookies from "universal-cookie";
import HospitalIcon from "../assets/hospital.png";
import LogoutIcon from "../assets/logout.png";
import { initialState } from "stream-chat-react/dist/components/Channel/channelState";
import { useTheme } from "../ContextProvider";

const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt="Hospital" width="30" />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="30" />
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Medical Pager</p>
    </div>
);

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({ setToggleContainer }) => {
    // const { isCreating, setIsCreating, setCreateType, setIsEditing } =
    //     useTheme();
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove("username");
        cookies.remove("fullName");
        cookies.remove("userId");
        cookies.remove("phoneNumber");
        cookies.remove("avatarURL");
        cookies.remove("hashedPassword");
        window.location.reload();
    };

    const filters = { members: { $in: [client.userID] } }; //in = included, get all channels, messages where user is included

    return (
        <>
            <SideBar logout={logout} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />
                {/* Stream channelList out of the box */}
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        /**
                         * but we want to build our own customed ChannelList,
                         * hence we create teamChannelList component
                         * and pass all the props to it instead using spread
                         */
                        <TeamChannelList
                            {...listProps}
                            type="team"
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        /**
                         * but we want to build our own customed ChannelList,
                         * hence we create teamChannelList component
                         * and pass all the props to it instead using spread
                         */
                        <TeamChannelList
                            {...listProps}
                            type="messaging"
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
};

const ChannelListContainer = () => {
    // const { setCreateType, setIsCreating, setIsEditing } = useTheme();
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent />
            </div>

            <div
                className="channel-list__container-responsive"
                style={{
                    left: toggleContainer ? "0%" : "-89%",
                    backgroundColor: "#005fff",
                }}
            >
                <div
                    className="channel-list__container-toggle"
                    onClick={() =>
                        setToggleContainer(
                            (prevToggleContainer) => !prevToggleContainer
                        )
                    }
                ></div>
                <ChannelListContent setToggleContainer={setToggleContainer} />
            </div>
        </>
    );
};

export default ChannelListContainer;
