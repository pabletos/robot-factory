import React, { useState, useEffect } from 'react';
import CandidateCard from '../../components/candidateCard/candidateCard';
import WorkBar from '../../components/workBar/workBar';
import MoneyBar from '../../components/moneyBar/moneyBar';
import StaffBar from '../../components/staffBar/staffBar';
import './main.css'
import Upgrade from '../../components/upgrade/upgrade';
import { getQuotes, generateRobots } from '../../utils/generation';

function MainPage(props) {
    const MIN_FUNCTIONS_CASH = 5;
    const base = {
        candidatesQuality: 0.5,
        candidatesPrice: 10,
        assemblyClickAmount: 1,
        assemblySecAmount: 1,
        minAssemblySell: 5,
        cashPerRobot: 5,
        candidatesNumber: 3
    }
    const [upgrades, setUpgrades] = useState({
        staff: {name: 'Robo-leaders', active: false, img: 'https://vignette.wikia.nocookie.net/brawlstars/images/c/cf/Robo_Rumble.png/revision/latest/scale-to-width-down/340?cb=20200304181912', desc: 'Unlocks the Staff menu.', quote: '', price: 100},
        rr: {name: 'Robot Resources', active: false, img: 'https://vignette.wikia.nocookie.net/brawlstars/images/2/24/Boss_Fight.png/revision/latest/scale-to-width-down/90?cb=20181226162523', desc: 'Unlocks the Robot Resources department.', quote: '', price: 500},
        industrial: {name: 'Robot slavery', active: false, img: 'https://vignette.wikia.nocookie.net/brawlstars/images/e/e6/Takedown.png/revision/latest/scale-to-width-down/90?cb=20190919143710', desc: 'Produces robots every second (+1 without bonuses)', quote: '', price: 5000},
        logistics: {name: 'Ludicrous profit', active: false, img: 'https://vignette.wikia.nocookie.net/brawlstars/images/1/1e/Gem_Grab.png/revision/latest/scale-to-width-down/90?cb=20200304181851', desc: 'Automatically sells when robot batch is ready.', quote: '', price: 10000}
    })
    const [candidates, setCandidates] = useState([]);
    const [staff, setStaff] = useState({
        hrDirector: null,
        rChief: null,
        ceo: null,
        transport: null
    })
    const [assemblyClickAmount, setAssemblyClickAmount] = useState(base.assemblyClickAmount);
    const [assemblySecAmount, setAssemblySecAmount] = useState(base.assemblySecAmount);
    const [minAssemblySell, setMinAssemblySell] = useState(base.minAssemblySell);
    const [cashPerRobot, setCashPerRobot] = useState(base.cashPerRobot);
    const [candidatesPrice, setCandidatesPrice] = useState(base.candidatesPrice);
    const [candidatesQuality, setCandidatesQuality] = useState(base.candidatesQuality);
    const [candidatesNumber, setCandidatesNumber] = useState(base.candidatesNumber);
    const [isFunctionsActive, setFunctionsActive] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [cash, setCash] = useState(0);
    const [isLogisticsActive, setLogistics] = useState(false);
    const [isIndustrialActive, setIndustrial] = useState(false);
    const [assembled, setAssembled] = useState(0);

    useEffect(() => {
        if (localStorage.data) {
            loadData(JSON.parse(localStorage.data));
        }
    }, [])

    useEffect(() => {
        saveData();
    })

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

    const loadData = (data) => {
        setAssembled(data.assembled);
        setAssemblyClickAmount(data.assemblyClickAmount);
        setAssemblySecAmount(data.assemblySecAmount);
        setIndustrial(data.isIndustrialActive);
        setMinAssemblySell(data.minAssemblySell);
        setLogistics(data.isLogisticsActive);
        setCash(data.cash);
        setCashPerRobot(data.cashPerRobot);
        setCandidatesPrice(data.candidatesPrice);
        setCandidatesQuality(data.candidatesQuality);
        setFunctionsActive(data.isFunctionsActive);
        setStaff(data.staff);
        setUpgrades(data.upgrades);
        setCandidatesNumber(data.candidatesNumber);
    }

    const saveData = () => {
        console.log('saving...')
        const data = {
            assembled,
            assemblyClickAmount,
            assemblySecAmount,
            isIndustrialActive,
            minAssemblySell,
            isLogisticsActive,
            cash,
            cashPerRobot,
            candidatesPrice,
            candidatesQuality,
            isFunctionsActive,
            staff,
            upgrades,
            candidatesNumber     
        }
        localStorage.setItem('data', JSON.stringify(data));
    }
    
    const onClickAssemble = () => {
        setAssembled(assembled => assembled + assemblyClickAmount);
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
                onChangeStaff(newStaff, position, robot.stats[position]);
                setCash(cash => cash - robot.cost);
                setCandidates(candidates => candidates.filter((cand) => cand.id !== id))

            } else {
                alert('Not enough cash');
            }
        }
    }

    const onChangeStaff = (newStaff, position, posStats) => {
        let value = Math.floor(posStats.value * 10);
        switch (position) {
            case 'hrDirector':
                switch (posStats.type) {
                    case 'quality':
                        setCandidatesQuality(base.candidatesQuality + (base.candidatesQuality * value / 10));
                        setCandidatesNumber(base.candidatesNumber);
                        setCandidatesPrice(base.candidatesPrice);
                        break;
                    case 'quantity':
                        setCandidatesNumber(base.candidatesNumber + value);
                        setCandidatesPrice(base.candidatesPrice);
                        setCandidatesQuality(base.candidatesQuality);
                        break;
                    case 'price':
                        setCandidatesPrice(Math.floor(base.candidatesPrice - (base.candidatesPrice * value / 10)));
                        setCandidatesQuality(base.candidatesQuality);
                        setCandidatesNumber(base.candidatesNumber);
                        break;
                    default:
                        break;
                }
                break;
            case 'rChief':
                switch (posStats.type) {
                    case 'quantityClick':
                        setAssemblyClickAmount(value);
                        setAssemblySecAmount(base.assemblySecAmount);
                        break;
                    case 'quantitySec':
                        setAssemblySecAmount(value);
                        setAssemblyClickAmount(base.assemblyClickAmount);
                        break;
                    default:
                        break;
                }
                break;
            case 'ceo':
                switch (posStats.type) {
                    case 'price':
                        setCashPerRobot(Math.floor(base.cashPerRobot + (base.cashPerRobot * value / 10)));
                        break;
                    case 'upgDto':
                        setCashPerRobot(base.cashPerRobot);
                        break;
                    default:
                        break;
                }
                break;
            case 'transport':
                switch (posStats.type) {
                    case 'quantity':
                        setMinAssemblySell(Math.floor(base.minAssemblySell - (base.minAssemblySell * value / 10)))
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        setStaff(newStaff);
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
            setCash(cash => cash - upgrades[key].price);
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
            if (candidates.length > 0) {
                setCandidates([]);
                setTimeout(() => setCandidates(generateRobots(candidatesNumber, candidatesQuality)), 10);
            } else {
                setCandidates(generateRobots(candidatesNumber, candidatesQuality));
            }
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
                <div className="functions-bar slide-in-right">
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