// import React, { useEffect, useState } from 'react';
// import styles from '@/page/Liquidity/Liquidity.module.css';
// import Footer from '@/component/Footer';
// import CoinSelectModal from '@/component/Modal/CoinSelect/CoinSelectModal';
// import SlippageModal from '@/component/Modal/Slippaage/SlippageModal';
// import blockchain_common_methods from '@/utils/blockchain_common_methods';
// import { getAmountOut } from '@/utils/swap_methods';
// import { useHistory } from 'react-router-dom';
// import DepositConfirmModal from '@/page/Liquidity/DepositConfirmModal';
// import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
// import {
//     _liquidityTrigger,
//     coinFromState,
//     coinToState,
//     depositConfirmModalState,
//     liquidityState,
//     withdrawalModalState,
// } from '@/stores/Liquidity';
// import WithdrawalModal from '@/page/Liquidity/WithdrawalModal';
// import { errorModalState, safeAccountAddress, slippageModalState } from '@/stores/Common';
// import { CoinType } from '@/types/utils.model';
// const { klaytn } = window;

// const Liquidity = () => {
//     const history = useHistory();
//     const { state, contents: liquidityLoadable } = useRecoilValueLoadable(liquidityState);
//     const fetchLiquidity = useSetRecoilState(_liquidityTrigger);

//     const [depositConfirmModal, setDepositConfirmModal] = useRecoilState(depositConfirmModalState);
//     const [slippageModal, setSlippageModal] = useRecoilState(slippageModalState);
//     const [coinFrom, setCoinFrom] = useRecoilState<CoinType['coinFrom']>(coinFromState);
//     const [coinTo, setCoinTo] = useRecoilState<CoinType['coinTo']>(coinToState);
//     const errorModalOpen = useRecoilValue(errorModalState);
//     const [withdrawalModal, setWithdrawalModal] = useRecoilState(withdrawalModalState);
//     const [walletAccount] = useRecoilState(safeAccountAddress);

//     const [coinFromModalOpen, setCoinFromModalOpen] = useState(false);
//     const [coinToModalOpen, setCoinToModalOpen] = useState(false);

//     const [fieldFromValue, setFieldFromValue] = useState('');
//     const isValid = state !== 'hasError' && state !== 'loading';

//     useEffect(() => {
//         if (coinFrom?.address !== coinTo?.address) {
//             fetchLiquidity((v) => v + 1);
//             parseAmountOut();
//         }
//     }, [walletAccount, coinFrom?.address, coinTo?.address, errorModalOpen]);

//     useEffect(() => {
//         parseAmountOut();
//     }, [fieldFromValue]);

//     const onChange = async (e) => {
//         const { value } = e.target;
//         setFieldFromValue(value);
//         setDepositConfirmModal({ ...depositConfirmModal, fieldFromValue: value });
//     };

//     const switchFields = () => {
//         const [_cf, _ct] = [coinFrom, coinTo];
//         const [_ff, _ft] = [depositConfirmModal.fieldFromValue, depositConfirmModal.fieldToValue];
//         // fieldFromValue는 너무 소수점(e-8)으로 가지 않도록 하기 위함
//         setCoinFrom(blockchain_common_methods.floorFloat(_ct));
//         setCoinTo(_cf);
//         setDepositConfirmModal({ ...depositConfirmModal, fieldFromValue: blockchain_common_methods.floorFloat(_ft) });
//     };

//     const onClickDepositButton = () => {
//         if (walletAccount && state !== 'loading' && depositConfirmModal.fieldFromValue) {
//             setDepositConfirmModal({ ...depositConfirmModal, isOpen: true, coinFrom, coinTo });
//         }
//     };

//     const refreshCoinInfo = () => {
//         // 얘는 10초마다 돌거나 refresh 가능하다.
//         // 토큰 2개가 모두 셀렉트 되면, if문이 충족되면서 getReserve, setReserve가 실행됨
//         // 풀의 잔고가 얼마나 있는지를 알려준다
//         if (state === 'loading') return;
//     };

//     const parseAmountOut = async () => {
//         try {
//             if (isNaN(parseFloat(depositConfirmModal.fieldFromValue))) {
//                 setDepositConfirmModal({ ...depositConfirmModal, fieldFromValue: '' });
//             } else if (parseFloat(depositConfirmModal.fieldFromValue) && coinFrom?.address && coinTo?.address) {
//                 const amount = await getAmountOut(
//                     coinFrom?.address,
//                     coinTo?.address,
//                     depositConfirmModal.fieldFromValue,
//                 );
//                 setDepositConfirmModal({ ...depositConfirmModal, fieldToValue: amount });
//             } else {
//                 setDepositConfirmModal({ ...depositConfirmModal, fieldToValue: '' });
//             }
//         } catch (e) {
//             setDepositConfirmModal({ ...depositConfirmModal, fieldToValue: 'Oops?!' });
//             console.log(e);
//         }
//     };

//     const openModal = (coin_direction) => {
//         if (coin_direction === 'from') {
//             setCoinFromModalOpen(true);
//         } else if (coin_direction === 'to') {
//             setCoinToModalOpen(true);
//         }
//     };

//     const closeModal = (coin_direction) => {
//         if (coin_direction === 'from') {
//             setCoinFromModalOpen(false);
//         } else if (coin_direction === 'to') {
//             setCoinToModalOpen(false);
//         }
//     };

//     const isWithdrawalButtonEnabled = () => {
//         // If both coins have been selected, and a valid float has been entered for both, which are less than the user's balances, then return true
//         const parsedInput: number = parseFloat(liquidityLoadable?.liquidityTokens);
//         return (
//             coinFrom?.address &&
//             coinTo?.address &&
//             !isNaN(parsedInput) &&
//             0 < parsedInput &&
//             parsedInput <= parseFloat(liquidityLoadable?.liquidityTokens)
//         );
//     };

//     const onOpenWithdrawalModal = () => {
//         setWithdrawalModal({ ...withdrawalModal, isOpen: true });
//     };

//     const onMax = () => {
//         setDepositConfirmModal({
//             ...depositConfirmModal,
//             fieldFromValue: liquidityLoadable.balance[coinFrom?.key as string],
//         });
//         setFieldFromValue(liquidityLoadable.balance[coinFrom?.key as string]);
//     };

//     return (
//         <div>
//             <DepositConfirmModal />
//             <SlippageModal />
//             <WithdrawalModal />

//             <CoinSelectModal
//                 isOpen={coinFromModalOpen}
//                 setSelectedCoin={(selectedCoin) => {
//                     // 같은 코인 넣으면 반대로 뒤집어주기
//                     if (coinTo?.key === 'bbz' && selectedCoin.key !== 'gpoo') return;
//                     if (selectedCoin.key === coinTo?.key) setCoinTo(coinFrom);
//                     setCoinFrom(selectedCoin);
//                 }}
//                 coins={liquidityLoadable?.coins}
//                 balance={liquidityLoadable?.balance}
//                 onRequestClose={() => closeModal('from')}
//                 direction={'from'}
//             />
//             <CoinSelectModal
//                 isOpen={coinToModalOpen}
//                 setSelectedCoin={(selectedCoin) => {
//                     // 같은 코인 넣으면 반대로 뒤집어주기
//                     if (coinFrom?.key !== 'gpoo' && selectedCoin.key === 'bbz') return;
//                     if (coinFrom?.key === 'bbz' && selectedCoin.key !== 'gpoo') return;
//                     if (selectedCoin.key === coinFrom?.key) setCoinFrom(coinTo);
//                     setCoinTo(selectedCoin);
//                 }}
//                 coins={liquidityLoadable?.coins}
//                 balance={liquidityLoadable?.balance}
//                 onRequestClose={() => closeModal('to')}
//                 direction={'to'}
//             />

//             <div className={styles['swap-main-wrapper']}>
//                 {klaytn?.networkVersion?.toString() !== process.env.REACT_APP_CHAIN_ID ? (
//                     <div className={styles['swap-not-connect']}>
//                         <div className={styles['connect-text']}>
//                             The network is not suitable.
//                             <br />
//                             Please check again if it is Klaytn mainnet(Cypress).
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         <div className={styles['swap-wrapper']}>
//                             <div className={styles['swap-title-wrapper']}>
//                                 <div className={styles['swap-title']}>Liquidity</div>
//                                 <div className={styles['swap-setting-wrapper']}>
//                                     {/* <div className={styles["swap-refresh-box"]} onClick={refreshCoinInfo}>*/}
//                                     {/*    <img src="images/refresh-bk-16.svg" loading="lazy"/>*/}
//                                     {/* </div>*/}
//                                     <div
//                                         className={styles['swap-setting-box']}
//                                         onClick={() => setSlippageModal({ ...slippageModal, isOpen: true })}
//                                     >
//                                         <img src={'images/setting_bk.svg'} loading="lazy" alt={''} />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className={styles['swap-content-wrapper']}>
//                                 <div className={styles['swap-title-wrapper']}>
//                                     <div className={styles['swap-sub-title']} style={{ flex: 1 }}>
//                                         INPUT
//                                     </div>
//                                     <div
//                                         className={styles['swap-sub-title-wrapper']}
//                                         style={{ flex: 1, justifyContent: 'flex-end' }}
//                                     >
//                                         <div className={styles['sub-balance']} style={{ flex: 1 }}>
//                                             Balance
//                                         </div>
//                                         <div className={styles['balance-text']} style={{ flex: 1 }}>
//                                             {isValid
//                                                 ? blockchain_common_methods.floorFloat(
//                                                       liquidityLoadable?.balance[coinFrom?.key as string] || '0',
//                                                   )
//                                                 : '0'}
//                                         </div>
//                                         <div className={styles['ticker-text']}>{coinFrom?.abbr}</div>
//                                     </div>
//                                 </div>
//                                 <div className={styles['coin-input-wrapper']}>
//                                     <div className={styles['coin-select']} onClick={() => openModal('from')}>
//                                         <div className={styles['coin-ticker-wrapper']}>
//                                             <img
//                                                 className={styles['coin-img']}
//                                                 src={coinFrom?.img}
//                                                 loading="lazy"
//                                                 alt={''}
//                                             />
//                                             <div className={styles['coin-text']}>{coinFrom?.abbr}</div>
//                                         </div>
//                                         <img src={'images/select_10_bk.svg'} loading="lazy" alt={''} />
//                                     </div>
//                                     <div className={styles['input-wrapper']}>
//                                         <input
//                                             className={styles['coin-input-text']}
//                                             onChange={(e) => onChange(e)}
//                                             name="coin_from"
//                                             value={fieldFromValue || ''}
//                                             placeholder="0.00"
//                                         />
//                                         <div className={styles['max-box']} onClick={() => onMax()}>
//                                             <div className={styles['max-box-text']}>MAX</div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className={styles['switching-wrapper']} onClick={switchFields}>
//                                     <div className={styles['switching-line']} />
//                                     <img
//                                         className={styles['switching-btn']}
//                                         src={'images/switching.svg'}
//                                         loading="lazy"
//                                         alt={''}
//                                     />
//                                 </div>
//                                 <div className={styles['swap-title-wrapper']}>
//                                     <div className={styles['swap-sub-title']} style={{ flex: 1 }}>
//                                         INPUT
//                                     </div>
//                                     <div
//                                         className={styles['swap-sub-title-wrapper']}
//                                         style={{ flex: 1, justifyContent: 'flex-end' }}
//                                     >
//                                         <div className={styles['sub-balance']} style={{ flex: 1 }}>
//                                             Balance
//                                         </div>
//                                         <div className={styles['balance-text']} style={{ flex: 1 }}>
//                                             {isValid
//                                                 ? blockchain_common_methods.floorFloat(
//                                                       liquidityLoadable?.balance[coinTo?.key as string] || '0',
//                                                   )
//                                                 : '0'}
//                                         </div>
//                                         <div className={styles['ticker-text']}>{coinTo?.abbr}</div>
//                                     </div>
//                                 </div>
//                                 <div className={styles['coin-input-wrapper']}>
//                                     <div className={styles['coin-select']} onClick={() => openModal('to')}>
//                                         <div className={styles['coin-ticker-wrapper']}>
//                                             <img
//                                                 className={styles['coin-img']}
//                                                 src={coinTo?.img}
//                                                 loading="lazy"
//                                                 alt={''}
//                                             />
//                                             <div className={styles['coin-text']}>{coinTo?.abbr}</div>
//                                         </div>
//                                         <img src={'images/select_10_bk.svg'} loading="lazy" alt={''} />
//                                     </div>
//                                     <div className={styles['input-wrapper']}>
//                                         <div className={styles['coin-input-text']}>
//                                             {blockchain_common_methods.floorFloat(depositConfirmModal.fieldToValue) ||
//                                                 '0.00'}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div
//                                 className={
//                                     walletAccount && state !== 'loading' && depositConfirmModal.fieldFromValue
//                                         ? styles['swap-btn']
//                                         : styles['swap-btn-dimd']
//                                 }
//                                 onClick={() => {
//                                     onClickDepositButton();
//                                 }}
//                             >
//                                 <div className={styles['swap-text']}>
//                                     {walletAccount ? (isValid ? 'Deposit' : 'Processing...') : 'Wallet Not Connected'}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className={styles['swap-bottom-wrapper']}>
//                             <div className={styles['bottom-align-wrapper']}>
//                                 <div className={styles['bottom-lebel']}>Expected Output</div>
//                                 <div className={styles['bottom-right-wrapper']}>
//                                     <div className={styles['bottom-text']}>1</div>
//                                     <div className={styles['bottom-text']} style={{ marginLeft: '4px' }}>
//                                         {coinFrom?.abbr}
//                                     </div>
//                                     <div
//                                         className={styles['bottom-text']}
//                                         style={{ marginLeft: '6px', marginRight: '6px' }}
//                                     >
//                                         ≈
//                                     </div>
//                                     <div className={styles['bottom-text']}>
//                                         {isValid
//                                             ? blockchain_common_methods.floorFloat(liquidityLoadable?.expectedOutput)
//                                             : '-'}
//                                     </div>
//                                     <div className={styles['bottom-text']} style={{ marginLeft: '4px' }}>
//                                         {coinTo?.abbr}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className={styles['bottom-align-wrapper']} style={{ marginTop: '20px' }}>
//                                 <div className={styles['bottom-lebel']}>Slippage Tolerance</div>
//                                 <div className={styles['bottom-right-wrapper']}>
//                                     <div className={styles['bottom-text']}>{slippageModal.currentSlippage}</div>
//                                     <div className={styles['bottom-text']} style={{ marginLeft: '4px' }}>
//                                         %
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* <div className={styles['bottom-align-wrapper']} style={{ marginTop: '20px' }}>*/}
//                             {/*    <div className={styles['bottom-lebel']}>Share of Pool</div>*/}
//                             {/*    <div className={styles['bottom-right-wrapper']}>*/}
//                             {/*        <div className={styles['bottom-text']}>{`${*/}
//                             {/*            parseFloat(totalSupply || 0.0)?.toFixed(2) || ''*/}
//                             {/*        }%`}</div>*/}
//                             {/*    </div>*/}
//                             {/* </div>*/}
//                         </div>

//                         <div className={styles['swap-wrapper']} style={{ marginTop: '50px' }}>
//                             <div className={styles['swap-title-wrapper']}>
//                                 <div className={styles['swap-title']}>Your Liquidity</div>
//                             </div>
//                             <div className={styles['swap-content-wrapper']}>
//                                 <div className={styles['swap-title-wrapper']}>
//                                     <div className={styles['pair-deposit-title']}>Pair Deposit</div>
//                                     <div className={styles['swap-sub-title-wrapper']}>
//                                         <div className={styles['lp-balance']}>LP Balance</div>
//                                     </div>
//                                 </div>
//                                 <div
//                                     style={{
//                                         display: 'flex',

//                                         flexDirection: 'row',
//                                         marginTop: 24,
//                                     }}
//                                 >
//                                     <div
//                                         style={{ display: 'flex', flexDirection: 'row', flex: 1, alignItems: 'center' }}
//                                     >
//                                         <img src={coinFrom?.img} loading="lazy" alt={''} />
//                                         <img src={coinTo?.img} loading="lazy" style={{ marginLeft: '-6px' }} alt={''} />
//                                         <div
//                                             className={styles['pair-coin-text']}
//                                         >{`${coinFrom?.abbr} + ${coinTo?.abbr}`}</div>
//                                     </div>

//                                     <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
//                                         <div style={{ fontSize: '20px', lineHeight: ' 1', color: '#fff' }}>
//                                             {blockchain_common_methods.floorFloat(liquidityLoadable?.liquidityTokens) ||
//                                                 '-'}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <button
//                                     className={
//                                         !isWithdrawalButtonEnabled()
//                                             ? styles['withdrawal-btn-dimd']
//                                             : styles['withdrawal-btn']
//                                     }
//                                     onClick={() => {
//                                         onOpenWithdrawalModal();
//                                     }}
//                                     disabled={!isValid || !isWithdrawalButtonEnabled()}
//                                 >
//                                     <div className={styles['withdrawal-text']}>
//                                         {walletAccount
//                                             ? isValid
//                                                 ? 'Withdrawal'
//                                                 : 'Processing...'
//                                             : 'Wallet Not Connected'}
//                                     </div>
//                                 </button>
//                             </div>
//                             <div
//                                 className={!walletAccount || !isValid ? styles['swap-btn-dimd'] : styles['swap-btn']}
//                                 onClick={() => history.push('/farm')}
//                             >
//                                 <div className={styles['swap-text']}>
//                                     {walletAccount ? (isValid ? 'Farming' : '...Processing') : 'Wallet Not Connected'}
//                                 </div>
//                             </div>
//                         </div>
//                     </>
//                 )}
//                 <div className={styles['swap-bg-circle']} />
//                 <Footer />
//                 <img className={styles['staking-bg']} src={'images/staking_bg2.png'} loading="lazy" alt={''} />
//             </div>
//         </div>
//     );
// };

// export default Liquidity;
