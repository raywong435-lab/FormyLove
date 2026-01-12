// 1. 註冊 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker 註冊成功，範圍：', registration.scope);
      })
      .catch(err => {
        console.log('Service Worker 註冊失敗：', err);
      });
  });
}

// 2. 表單處理邏輯
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loan-form');
    const resultSection = document.getElementById('result-section');
    const resultText = document.getElementById('result-text');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // 防止表單傳統提交

        // 從表單獲取數值
        const amount = parseFloat(document.getElementById('loan-amount').value);
        const annualRate = parseFloat(document.getElementById('interest-rate').value);
        const years = parseFloat(document.getElementById('loan-term').value);

        // 簡單的輸入驗證
        if (isNaN(amount) || isNaN(annualRate) || isNaN(years) || amount <= 0 || annualRate < 0 || years <= 0) {
            resultText.textContent = '錯誤：請輸入有效的數值。';
            resultSection.style.display = 'block';
            return;
        }

        // 計算月付金（等額本息攤還）
        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = years * 12;
        
        let monthlyPayment;
        if (monthlyRate === 0) { // 零利率情況
            monthlyPayment = amount / numberOfPayments;
        } else {
            monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }
        
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - amount;

        // 顯示結果
        resultText.innerHTML = `
            每月應付金額： <strong>${Math.round(monthlyPayment).toLocaleString()} 元</strong><br>
            總支付金額： ${Math.round(totalPayment).toLocaleString()} 元<br>
            總支付利息： ${Math.round(totalInterest).toLocaleString()} 元
        `;
        resultSection.style.display = 'block';
    });
});
