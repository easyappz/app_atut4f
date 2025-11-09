import { message } from 'antd';

export const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        if (data && typeof data === 'object') {
          Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
              data[key].forEach(msg => message.error(msg));
            } else {
              message.error(data[key]);
            }
          });
        } else {
          message.error('Некорректные данные');
        }
        break;
      case 401:
        message.error('Ошибка авторизации. Пожалуйста, войдите в систему');
        localStorage.removeItem('token');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
        break;
      case 403:
        message.error('Доступ запрещен');
        break;
      case 404:
        message.error('Ресурс не найден');
        break;
      case 500:
        message.error('Ошибка сервера. Пожалуйста, попробуйте позже');
        break;
      default:
        message.error(data?.detail || 'Произошла ошибка');
    }
  } else if (error.request) {
    message.error('Нет ответа от сервера. Проверьте подключение к интернету');
  } else {
    message.error('Произошла ошибка при отправке запроса');
  }

  return Promise.reject(error);
};

export const showSuccessMessage = (text) => {
  message.success(text);
};

export const showErrorMessage = (text) => {
  message.error(text);
};

export const showInfoMessage = (text) => {
  message.info(text);
};

export const showWarningMessage = (text) => {
  message.warning(text);
};
