import {getNamedAccounts} from "hardhat";

export const getNamedAccount = async (name: string) => (await getNamedAccounts())[name]