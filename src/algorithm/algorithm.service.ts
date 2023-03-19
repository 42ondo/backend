import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EvalEntity } from "src/eval/eval.entity";
import { EvalRepository } from "src/eval/eval.repository";
import { UserEntity } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { WordRepository } from "src/word/word.repository";
import { WordList } from "src/algorithm/algorithm.wordlist"

const Ratio = 0.3;

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

	async function2 (data: EvalEntity): Promise<void> {
		let weightToOndo: number;
		let begin = new Date(data.beginAt);
		let filled = new Date(data.filledAt);

		const evalList: EvalList = {
			commentLength: data.comment.length,
			isOutStanding: data.isOutStanding,
			timeSpent: filled.getTime() - begin.getTime()
		}

		//1. wordRepo에서 해당 data에 관련된(user_id를 이용해서) word정보 추출.: []
		const usedWordList = await this.wordRepository.find({
			where: {
				user_id: data.from,
			}
		})
		
		//2. 추출된 단어정보를 가지고 가중치 계산 (whitelist blacklist 들어갔다 나오면서)
		const wordList = new WordList();
		const globalW = wordList.globalWhite.element;
		const globalB = wordList.globalBlack.element;
		let cnt = 0;
		for (const [key, value] of Object(wordList).entries() ) {
			if (value.project_id === data.projectId) {
				usedWordList.forEach(x=>{
					if (value.project_id.element.includes(x.word))
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
		//4. timeSpent변수를 가지고, 가중치 계산
		//5. TimeScore 변수에 가중치 할당
		if (evalList.timeSpent / data.duration < 3) {
			const n = evalList.timeSpent / data.duration - 1
			weightToOndo += n * Ratio;
		}

		// commnetLength값으로 가중치
		if (evalList.commentLength > 60) {
			weightToOndo += (evalList.commentLength / 60) * Ratio
		} else {
			weightToOndo -= (evalList.commentLength / 60) * Ratio
		}

		//7. IsOutStanding값을 가지고 가중치 계산 및 할당.
		if (evalList.isOutStanding === true) {
			weightToOndo += 1 * Ratio
		}

		 this.userRepository.update({id: data.id}, {ondo: + weightToOndo})
	}
}
