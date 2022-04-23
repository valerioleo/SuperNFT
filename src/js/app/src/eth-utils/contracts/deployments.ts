// import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';

const emitsEvents = abi => abi.filter(entity => entity.type === 'event').length > 0;
// const getEventNames = abi => abi
//   .filter(entity => entity.type === 'event').map(event => event.name);
// const isJSONFile = fileName => path.extname(fileName) === '.json';

export const getDeployments = async (
  testFolder = '../../js/contracts/reference/deployments/**/*.json', // change this if no deployments are found
  outputFolder = '.',
  copyOnlyEventContracts = false
) => {
  const files = await glob.sync(testFolder);
  const filePromises = files.map(async currentFile => {
    const {address, abi, receipt} = await fs.readJson(currentFile);
    if(!copyOnlyEventContracts || (copyOnlyEventContracts && abi && emitsEvents(abi))) {
      const filename = currentFile.substr(currentFile.indexOf('deployments'));
      await fs.outputJson(`${outputFolder}${filename}`, {address, abi, receipt});
    }
  });
  await Promise.all(filePromises);
};

export const getVestingDeployments = async (
  testFolder = '../../js/contracts/vesting/deployments/**/*.json' // change this if no deployments are found
) => {
  await getDeployments(testFolder);
};

// export const getAllDeployments = async (
//   network = 'kovan'
// ) => {
//   const contractFolder = `../../../js/contracts/reference/deployments/${network}/*`;
//   const fileNames = await glob.sync(contractFolder);

//   const allFiles = await fileNames.filter(isJSONFile).reduce(
//     async (allFilesPromise, currentFileName) => {
//       const filesList = await allFilesPromise;
//       const contract = await fs.readJson(currentFileName);

//       if(emitsEvents(contract.abi)) {
//         const contractName = path.basename(currentFileName).split('.')[0];
//         const {address} = contract;
//         return [
//           ...filesList,
//           {
//             address,
//             name: contractName,
//             abi: contract.abi,
//             events: getEventNames(contract.abi)
//           }
//         ];
//       }

//       return filesList;
//     }, Promise.resolve([])
//   );
//   return allFiles;
// };
