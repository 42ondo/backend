import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EvalEntity } from "src/eval/eval.entity";
import { EvalRepository } from "src/eval/eval.repository";
import { UserEntity } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { WordRepository } from "src/word/word.repository";
import { WordList as wordList } from "src/algorithm/algorithm.wordlist"

const Ratio = 0.2;

type EvalList = {
    commentLength: number,
    isOutStanding: boolean,
    timeSpent: number
}

@Injectable()
export class AlgorithmService {
    constructor (
        @InjectRepository(EvalRepository)
        private evalRepository: EvalRepository,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(WordRepository)
        private wordRepository: WordRepository,
    ) {}	

	public async function(datas: EvalEntity[]): Promise<void> {
		for (const data of datas) {
			this.function2(data);
		}
	}

	async applyAlgoToUser(): Promise<void> {
		const datas = await this.evalRepository.find();
		let   i = 0;
		let   now;
		let   end;
		for (const data of datas) {
			if (i == 0)
				now = Date.now();
			i++;
			console.log(i)
			await this.function2(data);
			if (i % 50 == 0) {
				end = Date.now();
				console.log("time: ", (end - now) / 1000);
			}
		}
	}

	async function2 (data: EvalEntity): Promise<void> {
		let weightToOndo: number = 0;
		let begin = new Date(data.beginAt);
		let filled = new Date(data.filledAt);

		const userInf = await this.userRepository.findOne({
			where: {
				id: data.from,
			}
		})

		const evalList: EvalList = {
			commentLength: data.comment.length,
			isOutStanding: data.isOutStanding,
			timeSpent: filled.getTime() - begin.getTime()
		}

		const usedWordList = await this.wordRepository.find({
			where: {
				user_id: data.from,
			}
		})
		
		 const globalW = wordList.globalWhite.element;
		 const globalB = wordList.globalBlack.element;
		let cnt = 0;
		 for (const [key, value] of Object.entries(wordList) ) {
		 	if (value.project_id === data.projectId) {
		 		usedWordList.forEach(x=>{
		 			if (value.element.includes(x.word))
		 				cnt++;
		 			if (globalW.includes(x.word))
		 				cnt++;
		 			if (globalB.includes(x.word))
		 				cnt--;
		 			})
		 	}
		 	break ;
		 }

		weightToOndo += cnt * Ratio 
		if (evalList.timeSpent / data.duration < 3) {
			const n = evalList.timeSpent / data.duration - 1
			weightToOndo += n * Ratio;
		}
		weightToOndo += ((evalList.commentLength / 200) - 2) * Ratio
		if (evalList.isOutStanding === true) {
			weightToOndo += 1 * Ratio
		}
		let newOndo = userInf.ondo + weightToOndo;
		
		if (newOndo >= 99) {
			newOndo = 99;
		} else if (newOndo <= 0) {
			newOndo = 0;
		}
		await this.userRepository.update({id: data.from}, {ondo: newOndo})
	}
}
