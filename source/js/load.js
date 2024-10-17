if (window.PerformanceObserver) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "navigation" && entry.loadEventEnd > 0) {
        console.log(`页面载入时间: ${entry.duration.toFixed(0)} 毫秒`);
        document.querySelector(".load-time").innerHTML = `${(entry.duration/1000).toFixed(2)}`;
      }
    }
  });

  observer.observe({ type: "navigation", buffered: true });
}
