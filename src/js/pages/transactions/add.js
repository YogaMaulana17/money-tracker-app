import Transactions from '../../network/transactions';
import CheckUserAuth from '../auth/check-user-auth';
const Add = {
  async init() {
    CheckUserAuth.checkLoginState();
    this._initialUI();
    this._initialListener();
  },

  _initialUI() {
    const listInputRadioTransactionType = [
      {
        inputId: 'recordType1',
        value: 'income',
        caption: 'Pemasukan',
        required: true,
      },
      {
        inputId: 'recordType2',
        value: 'expense',
        caption: 'Pengeluaran',
        required: true,
      },
    ];
    const inputRadioTransactionTypeAdd = document.querySelector('#inputRadioTransactionTypeAdd');
    inputRadioTransactionTypeAdd.setAttribute(
      'listRadio',
      JSON.stringify(listInputRadioTransactionType),
    );
  },

  _initialListener() {
    // const evidenceInput = document.querySelector('#validationCustomEvidence');
    // evidenceInput.addEventListener('change', () => {
    //   this._updatePhotoPreview();
    // });

    const addFormRecord = document.querySelector('#addRecordForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      try {
        const response = await Transactions.store(formData);
        window.alert('New transaction added successfully');
        this._goToDashboardPage();
      } catch (error) {
        console.error(error);
      }
    }
  },

  _getFormData() {
    const nameInput = document.querySelector('#validationCustomRecordName');
    const amountInput = document.querySelector('#validationCustomAmount');
    const dateInput = document.querySelector('#validationCustomDate');
    const evidenceInput = document.querySelector('#validationCustomEvidence');
    const descriptionInput = document.querySelector('#validationCustomNotes');
    const typeInput = document.querySelector('input[name="recordType"]:checked');

    return {
      name: nameInput.value,
      amount: Number(amountInput.value),
      date: new Date(dateInput.value),
      evidence: evidenceInput.files[0],
      description: descriptionInput.value,
      type: typeInput.value,
    };
  },

  // _updatePhotoPreview() {
  //   const evidenceImgChange = document.querySelector('#validationCustomEvidenceImgChange');
  //   const evidenceImgInput = document.querySelector('#validationCustomEvidence');

  //   const photo = evidenceImgInput.files[0];
  //   if (!photo) return;

  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     evidenceImgChange.parentElement.classList.remove('d-none');
  //     evidenceImgChange.style.backgroundImage = `url('${event.target.result}')`;
  //   };

  //   reader.readAsDataURL(photo);
  // },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },
};

export default Add;
