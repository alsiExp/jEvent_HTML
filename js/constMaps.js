var speechStatusMap = new Map();
var partnerStatusMap = new Map();

function initConstMaps() {
    speechStatusMap.set(1, "Новый");
    speechStatusMap.set(2, "Рассмотрение заявки");
    speechStatusMap.set(3, "Описание доклада");
    speechStatusMap.set(4, "Тестирование, тренинги");
    speechStatusMap.set(5, "Требует уточнения");
    speechStatusMap.set(6, "Фидбек спикера");
    speechStatusMap.set(7, "Фидбек участников");
    speechStatusMap.set(8, "Анализ");
    speechStatusMap.set(9, "Закрыта");

    partnerStatusMap.set(1, '<button type="button" class="btn btn-xs color-gold" disabled="disabled">Gold</button>');
    partnerStatusMap.set(2, '<button type="button" class="btn btn-xs color-silver" disabled="disabled">Silver</button>');
    partnerStatusMap.set(3, '<button type="button" class="btn btn-xs color-bronze" disabled="disabled">Bronze</button>');
    partnerStatusMap.set(4, '<button type="button" class="btn btn-xs color-info" disabled="disabled">Info</button>');
}