import axios from "axios";

export const exportToCSV = (e, inventoryId) => {
  console.log('fileName', inventoryId)
  axios
    .get('/api/export_inventory', {
      params: { inventoryId: inventoryId },
      responseType: 'blob'
  })
    .then((res) => {
      console.log('res', res)
      const fileName = res.headers['content-disposition'].split('filename=')[1];
      console.log('fileName', fileName)
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((err) => console.log(err))
}