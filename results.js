window.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    
    const score = localStorage.getItem('Score');
    const totalQuestions = localStorage.getItem('TotalQuestions');
    
    if (score && totalQuestions) {
        scoreElement.textContent = `${score} / ${totalQuestions}`;
    } else {
        scoreElement.textContent = 'No results available.';
    }
});
