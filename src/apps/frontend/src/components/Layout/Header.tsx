import React from 'react';

/**
 * Props for the Header component.
 *
 * @interface HeaderProps
 * @property {string} [title="Task Tracker"] - Title text displayed in the header.
 * @property {boolean} [showUserInfo=true] - Whether to show the user info section.
 */
export interface HeaderProps {
    title?: string;
    showUserInfo?: boolean;
}

/**
 * Header component displaying a title, current date, and optional user info.
 *
 * @component
 * @param {HeaderProps} props
 * @param {string} [props.title="Task Tracker"] - Header title text.
 * @param {boolean} [props.showUserInfo=true] - Toggle for displaying user info.
 * @returns {React.ReactElement} The rendered header element.
 *
 * @example
 * ```
 * <Header
 *   title="Dashboard"
 *   showUserInfo={false}
 * />
 * ```
 */
export const Header: React.FC<HeaderProps> = ({
                                                  title = "Task Tracker",
                                                  showUserInfo = true
                                              }: HeaderProps): React.ReactElement => {
    /**
     * Formatted current date in Russian locale.
     * @type {string} todo rework for using date format ONLY
     */
    const currentDate: string = new Date().toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="header">
            <div className="header-container">
                {/* Title and date section */}
                <div className="header-left">
                    <h1 className="header-title">{title}</h1>
                    <span className="header-date">{currentDate}</span>
                </div>

                {showUserInfo && (
                    <div className="header-right">
                        {/* User info block */}
                        <div className="user-info">
                            <div className="user-avatar">
                                <span>А</span>
                            </div>
                            <div className="user-details">
                                <span className="user-name">Администратор</span>
                                <span className="user-role">Менеджер</span>
                            </div>
                        </div>

                        {/* Settings button */}
                        <button className="settings-btn" title="Настройки">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5
                     3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1
                     l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1
                     c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18
                     -.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2
                     3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97
                     l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4
                     1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65
                     c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22
                     .07-.49-.12-.64l-2.11-1.66Z"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};
