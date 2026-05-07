## Practice 9 — Доступні форми та валідація (ARIA)

Цей приклад показує доступну HTML-форму з:
- підказками через `aria-describedby`
- позначенням помилок через `aria-invalid`
- підсумковими повідомленнями через live region (`role="alert"`)

### Файли
- `index.html` — структура форми (label/fieldset, hint/error блоки, live region)
- `styles.css` — базові стилі + стилі стану помилки (`[aria-invalid="true"]`)
- `script.js` — валідація на `blur` і `submit`, керування ARIA-атрибутами

### Як запустити
1. Відкрий `index.html` у браузері (або через Live Server).
2. Спробуй:
   - вийти з поля (blur) з неправильним значенням → має показатися локальна помилка
   - натиснути Submit з помилками → має з’явитися підсумок у блоці `form-summary`

### Що перевірити (мінімум)
- `aria-describedby` на старті містить лише `...-hint`
- при помилці з’являється `aria-invalid="true"` і `aria-describedby` стає `"...-hint ...-error"`
- блок `form-summary` має `role="alert"` і оновлюється на Submit

