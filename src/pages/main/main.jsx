import React, { useState, useEffect } from 'react';
import CandidateCard from '../../components/candidateCard/candidateCard';
import WorkBar from '../../components/workBar/workBar';
import MoneyBar from '../../components/moneyBar/moneyBar';
import StaffBar from '../../components/staffBar/staffBar';
import './main.css'
import Upgrade from '../../components/upgrade/upgrade';
import { getQuotes, generateRobots } from '../../utils/generation';

function MainPage(props) {
    const [upgrades, setUpgrades] = useState({
        staff: {name: 'Robo-leaders', active: false, img: 'https://vignette.wikia.nocookie.net/brawlstars/images/c/cf/Robo_Rumble.png/revision/latest/scale-to-width-down/340?cb=20200304181912', desc: 'Unlocks the Staff menu.', quote: '', price: 0},
        rr: {name: 'Robot Resources', active: false, img: 'https://vignette.wikia.nocookie.net/brawlstars/images/2/24/Boss_Fight.png/revision/latest/scale-to-width-down/90?cb=20181226162523', desc: 'Unlocks the Robot Resources department.', quote: '', price: 0},
        industrial: {name: 'Robot slavery', active: false, img: 'https://vignette.wikia.nocookie.net/brawlstars/images/e/e6/Takedown.png/revision/latest/scale-to-width-down/90?cb=20190919143710', desc: 'Produces robots every second (+1 without bonuses)', quote: '', price: 0},
        logistics: {name: 'Ludicrous profit', active: false, img: 'https://vignette.wikia.nocookie.net/brawlstars/images/1/1e/Gem_Grab.png/revision/latest/scale-to-width-down/90?cb=20200304181851', desc: 'Automatically sells when robot batch is ready.', quote: '', price: 0}
    })
    const base = {
        candidatesQuality: 0.5,
        candidatesPrice: 10,
        assemblyClickAmount: 1,
        assemblySecAmount: 0,
        minAssemblySell: 5,
        cashPerRobot: 5,
        candidatesNumber: 3
    }
    const [candidates, setCandidates] = useState([]);
    const [staff, setStaff] = useState({
        hrDirector: null,
        rChief: null,
        ceo: null,
        transport: null
    })
    const MIN_FUNCTIONS_CASH = 5;
    const [assembled, setAssembled] = useState(0);
    const [assemblyClickAmount, setAssemblyClickAmount] = useState(base.assemblyClickAmount);
    const [assemblySecAmount, setAssemblySecAmount] = useState(base.assemblySecAmount);
    const [isIndustrialActive, setIndustrial] = useState(false);
    const [minAssemblySell, setMinAssemblySell] = useState(base.minAssemblySell);
    const [isLogisticsActive, setLogistics] = useState(false);
    const [cash, setCash] = useState(0);
    const [cashPerRobot, setCashPerRobot] = useState(base.cashPerRobot);
    const [processingTime, setProcessingTime] = useState(10);
    const [activeTab, setActiveTab] = useState(1);
    const [candidatesPrice, setCandidatesPrice] = useState(base.candidatesPrice);
    const [candidatesQuality, setCandidatesQuality] = useState(base.candidatesQuality);
    const [candidatesNumber, setCandidatesNumber] = useState(base.candidatesNumber);
    const [isFunctionsActive, setFunctionsActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
          setAssembled(assembled => {
            if (isIndustrialActive && assemblySecAmount > 0) {
                if (isLogisticsActive && assembled >= minAssemblySell) {
                    setCash(cash => cash + (minAssemblySell * cashPerRobot));
                    return assembled + assemblySecAmount - minAssemblySell;
                } else {
                    return assembled + assemblySecAmount;
                }
            }
            return assembled;
          })
        }, 1000);
        return () => clearInterval(interval);
      }, [assemblySecAmount, isIndustrialActive, isLogisticsActive, cashPerRobot, minAssemblySell]);

    const onClickAssemble = () => {
        setAssembled(assembled + assemblyClickAmount);
    }

    const onClickSell = () => {
        if (assembled >= minAssemblySell) {
            setAssembled(assembled => assembled - minAssemblySell);
            setCash(cash => { 
                const newCash = cash + (minAssemblySell * cashPerRobot);
                if (!isFunctionsActive && newCash >= MIN_FUNCTIONS_CASH) {
                    setFunctionsActive(true);
                }
                return newCash;
            });
        }
    }

    const onDragCandidateCard = (event) => {
        console.log(event.target.dataset.id)
        event.dataTransfer.setData("robotId", event.target.dataset.id);
    }

    const onDropCandidateCard = (event, position) => {
        event.preventDefault();
        const id = parseInt(event.dataTransfer.getData("robotId"));
        if (id) {
            const robot = candidates.filter(c => c.id === id)[0];
            if (cash >= robot.cost) {
                const newStaff = Object.assign({}, staff);
                newStaff[position] = robot;
                setStaff(newStaff);
                setCash(cash => cash - robot.cost);
                setCandidates(candidates => candidates.filter((cand) => cand.id !== id))
            } else {
                alert('Not enough cash');
            }
        }
    }

    const onDragCandidateOver = (event) => {
        event.preventDefault();
    }

    const buyUpgrade = (key) => {
        if (cash >= upgrades[key].price) {
            setUpgrades(upgrades => {
                const newUpgrades = Object.assign({}, upgrades);
                newUpgrades[key].active = true;
                return newUpgrades;
            })
            // Special features
            switch (key) {
                case 'industrial':
                    setIndustrial(true);
                    setAssemblySecAmount(secAmount => secAmount !== 0 ? secAmount : 1);
                    break;
                case 'logistics':
                    setLogistics(true);
                    break;
                default:
                    break;
            }
        }
    }

    const changeTab = (event) => {
        setActiveTab(parseInt(event.target.dataset.tab));
    }

    const buyCandidates = () => {
        if (cash >= candidatesPrice) {
            setCandidates(generateRobots(candidatesNumber, candidatesQuality));
            setCash(oldCash => oldCash - candidatesPrice);
        }
    }

    const renderStaff = React.useMemo(
        () => {
            if (upgrades.staff.active) {
                return (
                    <StaffBar 
                        hrDirector={staff.hrDirector} 
                        rChief={staff.rChief}
                        ceo={staff.ceo}
                        transport={staff.transport}
                        onDrop={onDropCandidateCard} 
                        onDragOver={onDragCandidateOver}/>
                )
            }
        }
    , [staff, upgrades, candidates, cash]);

    const renderUpgrades = () => {
        let upgradeList = [];
        Object.keys(upgrades).forEach(key => {
            const obj = upgrades[key];
            upgradeList.push(
                <Upgrade 
                    key={"up-"+key}
                    image={obj.img} 
                    name={obj.name}
                    desc={obj.desc}
                    price={obj.price}
                    active={obj.active}
                    onBuy={() => buyUpgrade(key)}
                />
            );
        });
        return (
            <div className="upg-container">
                { upgradeList }
            </div>
        )
    }

    const renderCandidates = () => {
        return (
            <>
                <div>
                    <div className={cash >= candidatesPrice ? "tertiary btn btn-generate" : "tertiary btn btn-generate disabled"} onClick={buyCandidates}>
                        Generate! ({ candidatesPrice }$)
                    </div>
                </div>
                <div className="cand-container">
                    { candidates.map((candidate, index) => <CandidateCard key={'cd-' + index} robot={candidate} onDragStart={onDragCandidateCard}/>) }
                </div>
            </>
        )
    }

    const renderFunctionBar = React.useMemo(
        () => {
            let activeContent = null;
            switch (activeTab) {
                case 1:
                    activeContent = renderUpgrades;
                    break;
                case 2:
                    activeContent = renderCandidates;
                    break;
                default:
                    break;
            }
            return (
                <div className="functions-bar">
                    <ul className="tabs" role="nav">
                        <li data-tab="1" className={activeTab === 1 ? "tab active" : "tab"} onClick={changeTab}>Upgrades</li>
                        { upgrades.rr.active && 
                            <li data-tab="2" className={activeTab === 2 ? "tab active" : "tab"} onClick={changeTab}>Robot Resources</li> 
                        }
                    </ul>
                    <div className="tab-content">
                        { activeContent() }
                    </div>
                </div>
            )
        }
    , [activeTab, candidates, upgrades, cash, candidatesPrice, staff, candidatesQuality, candidatesNumber]);

    return (
        <div className="game-wrapper">
            <div className="mainBar">
                <WorkBar onClick={onClickAssemble} total={assembled}/>
                <progress className="send-bar" value={assembled / minAssemblySell}></progress>
                <MoneyBar onClick={onClickSell} total={cash} robots={assembled} min={minAssemblySell}/>
            </div>
            { renderStaff }
            { isFunctionsActive && renderFunctionBar }
        </div>
    )
}

export default MainPage;