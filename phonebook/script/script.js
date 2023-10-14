'use strict';

{
  const data = [
    {
      name: 'Иван',
      surname: 'Петров',
      phone: '+79514545454',
      edit: {
        className: 'btn btn-edit',
        type: 'button',
      },
    },
    {
      name: 'Игорь',
      surname: 'Семёнов',
      phone: '+79999999999',
      edit: {
        className: 'btn btn-edit',
        type: 'button',
      },
    },
    {
      name: 'Семён',
      surname: 'Иванов',
      phone: '+79800252525',
      edit: {
        className: 'btn btn-edit',
        type: 'button',
      },
    },
    {
      name: 'Мария',
      surname: 'Попова',
      phone: '+79876543210',
      edit: {
        className: 'btn btn-edit',
        type: 'button',
      },
    },
  ];

  const getContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');

    return container;
  };

  const getHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = getContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;

    return header;
  };

  const getLogo = (title) => {
    const logo = document.createElement('h1');
    logo.classList.add('logo');
    logo.textContent = `Телефонная книга ${title}`;

    return logo;
  };

  const getMain = () => {
    const main = document.createElement('main');
    main.classList.add('main');

    const mainContainer = getContainer();
    main.append(mainContainer);

    main.mainContainer = mainContainer;

    return main;
  };

  const getButtonGroup = params => {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.className = className;
      button.type = type;
      button.textContent = text;

      return button;
    });

    buttonWrapper.append(...btns);

    return {
      buttonWrapper,
      btns,
    };
  };

  const getTable = () => {
    const table = document.createElement('table');
    table.classList.add('table');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete"></th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const getForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');

    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="label-form" for="name">Имя</label>
        <input class="form-input" id="name" type="text"
          name="name" required>
      </div>
      <div class="form-group">
        <label class="label-form" for="surname">Фамилия</label>
        <input class="form-input" id="surname" type="text"
          name="surname" required>
      </div>
      <div class="form-group">
        <label class="label-form" for="phone">Телефон</label>
        <input class="form-input" id="phone" type="number"
          name="phone" required>
      </div>
    `);

    const buttonGroup = getButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const getP = () => {
    const p = document.createElement('p');

    return p;
  };

  const getFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = getContainer();
    footerContainer.classList.add('footer-container');

    const footerText = getP();
    footerText.classList.add('footer-text');
    footerText.textContent = `Все права зацищены ${title}`;
    
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    footerContainer.append(footerText);

    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = getHeader();
    const logo = getLogo(title);

    const main = getMain();
    const buttonGroup = getButtonGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = getTable();
    const form = getForm();

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.buttonWrapper, table, form.overlay);

    const footer = getFooter(title);

    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const createRow = ({name: firstName, surname, phone, edit}) => {
    const tr = document.createElement('tr');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdTel = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel: ${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdTel.append(phoneLink);

    const tdEdit = document.createElement('td');

    const getButton = (edit) => {
      const {className, type} = edit;

      const btnEdit = document.createElement('button');
      btnEdit.className = className;
      btnEdit.type = type;

      btnEdit.insertAdjacentHTML('beforeend', `
        <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M405.333 256C399.675 256 394.249 258.248 390.248 262.248C386.248 266.249 384 271.675 384 277.333V448C384 459.755 374.443 469.333 362.667 469.333H64C52.224 469.333 42.6667 459.755 42.6667 448V149.333C42.6667 137.579 52.224 128 64 128H234.667C240.325 128 245.751 125.752 249.752 121.752C253.752 117.751 256 112.325 256 106.667C256 101.009 253.752 95.5825 249.752 91.5818C245.751 87.581 240.325 85.3334 234.667 85.3334H64C28.7147 85.3334 0 114.048 0 149.333V448C0 483.285 28.7147 512 64 512H362.667C397.952 512 426.667 483.285 426.667 448V277.333C426.667 271.675 424.419 266.249 420.418 262.248C416.418 258.248 410.991 256 405.333 256Z" />
        <path d="M200.021 236.565C198.538 238.055 197.522 239.946 197.099 242.005L182.016 317.44C181.678 319.162 181.769 320.941 182.281 322.619C182.793 324.298 183.711 325.824 184.953 327.064C186.194 328.304 187.723 329.219 189.402 329.728C191.081 330.237 192.86 330.325 194.581 329.984L269.995 314.901C272.066 314.492 273.967 313.475 275.456 311.979L444.245 143.189L368.832 67.776L200.021 236.565ZM496.384 15.616C486.377 5.62799 472.816 0.0183716 458.677 0.0183716C444.539 0.0183716 430.978 5.62799 420.971 15.616L391.445 45.1413L466.859 120.555L496.384 91.0294C506.453 80.9814 512 67.584 512 53.3333C512 39.0827 506.453 25.6853 496.384 15.616Z" />
        </svg>
      `);

      return btnEdit;
    };
    const btnEdit = getButton(edit);
    tdEdit.append(btnEdit);

    tr.append(tdDel, tdName, tdSurname, tdTel, tdEdit);

    return tr;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach((contact) => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
        console.log(contact);
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);

    elem.append(...allRow);

    return allRow;
  };

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const phoneBook = renderPhoneBook(app, title);

    const {list, logo, btnAdd, formOverlay, form} = phoneBook;

    const allRow = renderContacts(list, data);
    hoverRow(allRow, logo);

    // const objEvent = {
    //   a: 1,
    //   b: 2,

    // Такой объект нужен если необходимо хранить данные
    // в отдельных свойствах или обращаться к ним через this
    //   handleEvent(event) {
    //     if (event.ctrlKey) {
    //       this.bar();
    //     } else {
    //       this.foo();
    //     }
    //   },
    //   bar() {
    //     document.body.style.backgroundColor = 'black';
    //   },
    //   foo() {
    //     formOverlay.classList.add('is-visible');
    //   },
    // };


    


    btnAdd.addEventListener('click', (event) => {
      console.log(event);
    });

    // Для закрытия модального окна при нажатии вне окна
    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });

    form.addEventListener('click', event => {
      event.stopPropagation();
      // Такой же как и предыдущий
      // event.stopPropagation(); Не дает завершить работу другим всплытиям
    });

    formOverlay.addEventListener('click', () => {
      formOverlay.classList.remove('is-visible');
    });

    const buttonClose = document.querySelector('.close');
    console.log(buttonClose);

    buttonClose.addEventListener('click', () => {
      formOverlay.classList.remove('is-visible');
    });

    // document.addEventListener('touchstart', e => {
    //   console.log(e);
    // });

    // document.addEventListener('touchstart', e => {
    //   console.log(e.type);
    // });

    // document.addEventListener('touchstart', e => {
    //   console.log(e.type);
    // });
    
};
  window.phoneBookInit = init;
}
