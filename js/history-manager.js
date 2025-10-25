// History management
class HistoryManager {
    constructor() {
        this.history = [];
        this.maxItems = 10;
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('atcMessages');
            this.history = saved ? JSON.parse(saved) : [];
            this.renderHistory();
        } catch (error) {
            console.error('Error loading history:', error);
            this.history = [];
            this.renderHistory();
        }
    }

    saveHistory() {
        try {
            localStorage.setItem('atcMessages', JSON.stringify(this.history));
            this.renderHistory();
        } catch (error) {
            console.error('Error saving history:', error);
        }
    }

    saveMessage(text, speaker, type) {
        // Проверяем, что сообщение не пустое и не содержит placeholder
        if (!text || text.includes('Fill out the form')) {
            return false;
        }

        const message = {
            text: text.trim(),
            speaker,
            type,
            timestamp: new Date().toISOString(),
            id: Date.now() + Math.random() // Уникальный ID
        };

        this.history.unshift(message);

        // Ограничиваем количество сообщений
        if (this.history.length > this.maxItems) {
            this.history = this.history.slice(0, this.maxItems);
        }

        this.saveHistory();
        return true;
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
    }

    renderHistory() {
        const container = document.getElementById('messageHistory');

        if (!container) {
            console.error('History container not found');
            return;
        }

        if (this.history.length === 0) {
            container.innerHTML = '<p class="empty-history">No messages in history yet</p>';
            return;
        }

        container.innerHTML = this.history.map(msg => {
            // Извлекаем только текст сообщения без метаданных
            const messageText = typeof msg.text === 'string' ? msg.text : '';
            const displayText = messageText.split('\n').slice(-1)[0] || messageText; // Берем последнюю строку если есть переносы

            return `
                <div class="history-item ${msg.speaker ? msg.speaker.toLowerCase() : ''}">
                    <div class="history-header">
                        <span class="history-sender ${msg.speaker ? msg.speaker.toLowerCase() : ''}">
                            ${msg.speaker || 'Unknown'}
                        </span>
                        <span class="history-time">
                            ${msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : 'Unknown time'}
                        </span>
                    </div>
                    <div class="history-text">${displayText}</div>
                    <div class="history-type">${msg.type || 'Unknown type'}</div>
                </div>
            `;
        }).join('');
    }

    // Метод для получения истории (может пригодиться)
    getHistory() {
        return [...this.history];
    }

    // Метод для удаления конкретного сообщения
    deleteMessage(id) {
        this.history = this.history.filter(msg => msg.id !== id);
        this.saveHistory();
    }
}