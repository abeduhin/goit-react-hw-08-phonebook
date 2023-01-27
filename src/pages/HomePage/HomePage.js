import style from './HomePage.module.css';

export default function HomePage() {
    return (
        <div className={style.container}>
            <h1 className={style.title}>
                Phonebook welcome page{' '}
              <span role="img" aria-label="Telephone icon">
                ☎️
              </span>
            </h1>
        </div>
    );
};