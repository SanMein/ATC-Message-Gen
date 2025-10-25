// Main application controller
class ATCApp {
    constructor() {
        this.messageGenerator = new MessageGenerator();
        this.historyManager = new HistoryManager();
        this.init();
    }

    init() {
        this.bindEvents();
        this.historyManager.loadHistory();
        this.updateCommandOptions();
        this.clearFormFields();

        // Отключить автозаполнение для всех полей
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.setAttribute('autocomplete', 'off');
        });
    }

    bindEvents() {
        // Tabs
        document.getElementById('pilotTab').addEventListener('click', () => this.switchTab('Pilot'));
        document.getElementById('atcTab').addEventListener('click', () => this.switchTab('ATC'));

        // Form
        document.getElementById('atcForm').addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Message actions
        document.getElementById('copyBtn').addEventListener('click', () => this.copyMessage());
        document.getElementById('speakBtn').addEventListener('click', () => this.speakMessage());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveMessage());

        // History
        document.getElementById('clearHistoryBtn').addEventListener('click', () => this.clearHistory());

        // Modal
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
        document.getElementById('closeHelpModal').addEventListener('click', () => this.hideHelp());
        document.getElementById('helpModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.hideHelp();
        });

        // ATC Name formatting
        document.getElementById('atcName').addEventListener('input', function() {
            this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        });
    }

    clearFormFields() {
        const form = document.getElementById('atcForm');
        const fields = form.querySelectorAll('input, textarea, select');

        fields.forEach(field => {
            if (field.type !== 'hidden' && field.id !== 'speakerType') {
                if (field.tagName === 'SELECT') {
                    field.selectedIndex = 0;
                } else {
                    field.value = '';
                }
            }
        });

        // Установить tailNumber пустым
        document.getElementById('tailNumber').value = '';

        // Установить первый активный tab
        this.switchTab('Pilot');
    }

    switchTab(tab) {
        const pilotTab = document.getElementById('pilotTab');
        const atcTab = document.getElementById('atcTab');
        const speakerType = document.getElementById('speakerType');

        if (tab === 'Pilot') {
            pilotTab.classList.add('active');
            atcTab.classList.remove('active');
            speakerType.value = 'Pilot';
        } else {
            atcTab.classList.add('active');
            pilotTab.classList.remove('active');
            speakerType.value = 'ATC';
        }

        this.updateCommandOptions();
    }

    updateCommandOptions() {
        const isPilot = document.getElementById('speakerType').value === 'Pilot';
        const pilotGroup = document.querySelector('optgroup[label="Pilot Messages"]');
        const atcGroup = document.querySelector('optgroup[label="ATC Responses"]');

        if (isPilot) {
            pilotGroup.style.display = 'block';
            atcGroup.style.display = 'none';
            document.getElementById('commandType').value = pilotGroup.querySelector('option').value;
        } else {
            pilotGroup.style.display = 'none';
            atcGroup.style.display = 'block';
            document.getElementById('commandType').value = atcGroup.querySelector('option').value;
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const message = this.messageGenerator.generate(data);
        this.displayMessage(message, data.speakerType);
    }

    displayMessage(message, speakerType) {
        const output = document.getElementById('messageOutput');
        output.innerHTML = `
            <div class="w-full">
                <div class="history-header">
                    <span class="history-sender ${speakerType.toLowerCase()}">${speakerType}</span>
                    <span class="history-time">${new Date().toLocaleTimeString()}</span>
                </div>
                <div class="history-text">${message}</div>
            </div>
        `;
    }

    copyMessage() {
        const messageText = document.getElementById('messageOutput').textContent;
        if (messageText && !messageText.includes('Fill out the form')) {
            navigator.clipboard.writeText(messageText)
                .then(() => this.showFeedback('copyBtn', 'Copied!'))
                .catch(err => console.error('Copy failed:', err));
        }
    }

    speakMessage() {
        const messageText = document.getElementById('messageOutput').textContent;
        if (messageText && !messageText.includes('Fill out the form')) {
            const utterance = new SpeechSynthesisUtterance(messageText);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        }
    }

    saveMessage() {
        const messageText = document.getElementById('messageOutput').textContent;
        if (messageText && !messageText.includes('Fill out the form')) {
            const speakerType = document.getElementById('speakerType').value;
            const commandType = document.getElementById('commandType').value;

            this.historyManager.saveMessage(messageText, speakerType, commandType);
            this.showFeedback('saveBtn', 'Saved!');
        }
    }

    clearHistory() {
        this.historyManager.clearHistory();
    }

    showHelp() {
        document.getElementById('helpModal').classList.add('show');
    }

    hideHelp() {
        document.getElementById('helpModal').classList.remove('show');
    }

    showFeedback(buttonId, text) {
        const button = document.getElementById(buttonId);
        const original = button.innerHTML;
        button.innerHTML = `<i class="fas fa-check"></i>${text}`;
        setTimeout(() => button.innerHTML = original, 2000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ATCApp();
});