import React, { useState, useEffect } from 'react';

const TimerApp = () => {
  const [time, setTime] = useState(10); // タイマーの初期値（秒）
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;
    if (isRunning && time > 0) {
      console.log('タイマーが動作中です。現在の時間:', time); // タイマーの状態を確認
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      console.log('タイマーが終了しました。通知を表示します。'); // タイマー終了時の確認
      showNotification();
      setIsRunning(false);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, time]);

  const startTimer = () => {
    console.log('タイマーを開始します。'); // タイマー開始時の確認
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    console.log('タイマーを停止します。'); // タイマー停止時の確認
    setIsRunning(false);
  };

  const resetTimer = () => {
    console.log('タイマーをリセットします。'); // タイマーリセット時の確認
    setIsRunning(false);
    setTime(10); // リセット後のタイマー時間（秒）
  };

  const showNotification = () => {
    console.log('通知の表示処理を開始します。'); // 通知の表示処理開始時の確認
    if (Notification.permission === 'granted') {
      console.log('通知の権限が許可されています。'); // 通知の権限が許可されているかの確認
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          console.log('Service Workerが登録されています。通知を表示します。'); // Service Workerの登録状況の確認
          reg.showNotification('タイマー終了', {
            body: '時間が経過しました!',
            icon: `${process.env.PUBLIC_URL}/logo192.png`
          });
        } else {
          console.warn('Service Workerが登録されていません。'); // Service Workerが登録されていない場合の警告
        }
      }).catch(error => {
        console.error('Service Workerの取得中にエラーが発生しました:', error); // エラーが発生した場合の確認
      });
    } else if (Notification.permission !== 'denied') {
      console.log('通知の権限をリクエストしています。'); // 通知の権限をリクエストする際の確認
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('通知の権限が付与されました。通知を表示します。'); // 通知の権限が付与された後の確認
          showNotification();
        } else {
          console.warn('通知の権限が拒否されました。'); // 通知の権限が拒否された場合の警告
        }
      }).catch(error => {
        console.error('通知の権限をリクエスト中にエラーが発生しました:', error); // エラーが発生した場合の確認
      });
    } else {
      console.warn('通知の権限が拒否されています。'); // 通知の権限が拒否されている場合の警告
    }
  };

  return (
    <div>
      <h1>タイマー: {time} 秒</h1>
      <button onClick={startTimer}>開始</button>
      <button onClick={stopTimer}>停止</button>
      <button onClick={resetTimer}>リセット</button>
    </div>
  );
};

export default TimerApp;
