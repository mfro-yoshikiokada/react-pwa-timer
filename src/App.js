import React, { useState, useEffect } from 'react';

const TimerApp = () => {
  const [time, setTime] = useState(10); // タイマーの初期値（秒）
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;
    if (isRunning && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      showNotification();
      setIsRunning(false);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning, time]);

  const startTimer = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(10); // リセット後のタイマー時間（秒）
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          reg.showNotification('タイマー終了', {
            body: '時間が経過しました!',
            icon: '/icon.png',
          });
        }
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification();
        }
      });
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
