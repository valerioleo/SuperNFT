// defaults
export const host = '0xF0d7d1D47109bA426B9D8A3Cde1941327af1eea3';

export type DeployParams = {
  host?: string;
} 
export const getParams = async (params: DeployParams = {}) => ({
  host,
    ...params
})
