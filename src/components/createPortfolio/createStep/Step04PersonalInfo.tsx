import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import { StContainer } from '@src/components/common/createPortfolio/createStepStyles';
import { STEP } from '@src/constants/createPortfolioConstants';
import { CreatePortfolioStepProps } from '@src/types/portfolioType';

const Step04PersonalInfo = ({ onNextButtonClick }: CreatePortfolioStepProps) => {
  return (
    <StContainer>
      STEP 4
      <NextStepButton onClick={() => onNextButtonClick(STEP.FIVE)} />
    </StContainer>
  );
};

export default Step04PersonalInfo;
