import { useState, useEffect, useContext } from "react"

//arrows for deploy menu
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//search
import SearchIcon from '@mui/icons-material/Search';
//folders
import FolderSharedIcon from '@mui/icons-material/FolderShared';
//hour
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
//language
import LanguageIcon from '@mui/icons-material/Language';

//button multiusos
import { MenuButton } from "../Buttons/MenuButton";
import { StartMenu } from "../StartMenu/StartMenu";

import { useTranslation } from "react-i18next";
import { UserContext } from '../Context/userContext';


export const TaskBar = ({ theme, openWindow, setViewDate, viewDate }) => {

    const [t, i18n] = useTranslation("global");
    const [deploy, setDeploy] = useState(false)
    const { user, token } = useContext(UserContext);

    const changeLang = () => {
        if (i18n.language === 'es') {
            i18n.changeLanguage('en')
        } else {
            i18n.changeLanguage('es');
        }
    }

    useEffect(() => {

    }, [deploy])

    const rightElements = [
        { type: 'main', info: t("Info.start"), symbol: !deploy ? KeyboardArrowDownIcon : KeyboardArrowUpIcon, click: () => setDeploy(!deploy) },
        /* { type: 'search', info: t("Info.search"), symbol: SearchIcon }, */
        { type: 'main', info: t("Info.folders"), symbol: FolderSharedIcon, click: () => openWindow('explorer') }
    ]

    const leftElements = [
        { type: 'micro', info: t("Info.time"), symbol: QueryBuilderIcon, click: () => setViewDate(!viewDate) },
        { type: 'micro', info: t("Info.language"), symbol: LanguageIcon, click: () => changeLang() }
    ]

    return (
        <section className={`taskbar--main ${theme}`}>

            {deploy ? <StartMenu
                theme={theme}
                openWindow={openWindow} /> : null}

            <div className="taskbar--internal-frame">
                {rightElements.map((e, i) => {
                    return (
                        i === 0 ? <MenuButton key={i} type={e.type} info={e.info} Symbol={e.symbol} theme={theme} click={e.click} />
                            : token !== null && token !== undefined ? <MenuButton key={i} type={e.type} info={e.info} Symbol={e.symbol} theme={theme} click={e.click} />
                                : null
                    )
                })}
            </div>

            <div className="taskbar--internal-frame">
                {leftElements.map((e, i) => {
                    return (
                        <MenuButton key={i} type={e.type} info={e.info} Symbol={e.symbol} theme={theme} click={e.click} />
                    )
                })}
            </div>

        </section>
    )
}