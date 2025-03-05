import { computed, reactive, toRefs } from 'vue';
import { useCacheStorage } from './storage';
import axios from 'axios';

interface IDateEvent {
  dateTime: string;
  timeZone: string;
}

interface IEmailEvent {
  email: string;
}

interface ICreateEvent {
  title: string;
  start: IDateEvent;
  end: IDateEvent;
  attendees: IEmailEvent[];
}

export const useGoogleCalendar = () => {
  const user = useCacheStorage().getItemStorage('user-storage');
  const URL_EVENTS =
    'https://www.googleapis.com/calendar/v3/calendars/primary/events';

  const state = reactive({
    listEvents: [],
    loadingGoogleCalendar: false,
  });

  const getIframeURL = computed(() => {
    return `https://calendar.google.com/calendar/embed?src=${user.email}&ctz=America%2FSao_Paulo`;
  });

  const configHeaders = computed(() => {
    return {
      headers: {
        Authorization: `Bearer ${user.google_access_token}`,
      },
    };
  });

  const getEventsGoogleCalendar = async () => {
    state.loadingGoogleCalendar = true;
    await axios
      .get(URL_EVENTS, configHeaders.value)
      .then(({ data }) => {
        state.listEvents = data;
      })
      .finally(() => {
        state.loadingGoogleCalendar = false;
      });
  };

  const numberRandom = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const createEventsGoogleCalendar = async (data: ICreateEvent) => {
    state.loadingGoogleCalendar = true;
    await axios
      .post(
        URL_EVENTS,
        {
          ...data,
          extendedProperties: {
            private: {
              platformId: 'IPersonal',
              eventId: numberRandom(),
            },
          },
        },
        configHeaders.value
      )
      .finally(() => {
        state.loadingGoogleCalendar = false;
      });
  };

  return {
    getEventsGoogleCalendar,
    createEventsGoogleCalendar,
    ...toRefs(state),
    getIframeURL,
  };
};
