export class NotificationComponent {
    constructor() {
        this.notifications = [];
    }

    show(message, duration = 2000) {
        const notification = this.createNotification(message, duration);
        document.body.appendChild(notification);
        this.notifications.unshift(notification); // Добавляем в начало массива

        this.updatePositions();

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            this.hide(notification);
        }, duration);

        return notification;
    }

    createNotification(message, duration) {
        const notification = document.createElement('div');
        notification.textContent = message;

        notification.style.cssText = `
            position: fixed;
            right: 20px;
            background-color: #007bff;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease-in-out;
            max-width: 300px;
            word-wrap: break-word;
            cursor: pointer;
        `;

        notification.title = 'Нажмите, чтобы закрыть';

        // Добавляем обработчик клика для закрытия
        notification.addEventListener('click', () => {
            this.hide(notification);
        });

        return notification;
    }

    hide(notification) {
        if (!notification.parentNode) return;

        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
                this.removeFromArray(notification);
                this.updatePositions();
            }
        }, 250);
    }

    removeFromArray(notification) {
        const index = this.notifications.indexOf(notification);
        if (index > -1) {
            this.notifications.splice(index, 1);
        }
    }

    updatePositions() {
        this.notifications.forEach((notification, index) => {
            if (notification.parentNode) {
                // Новые уведомления (с меньшим индексом) будут внизу
                notification.style.bottom = `${20 + ((this.notifications.length - 1 - index) * 70)}px`;
            }
        });
    }

    hideAll() {
        this.notifications.forEach(notification => {
            this.hide(notification);
        });
    }
}

export const notificationService = new NotificationComponent();