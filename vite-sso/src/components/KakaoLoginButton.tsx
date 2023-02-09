import React from 'react';

import tw from 'twin.macro';

import kakaoSvg from '@assets/kakao.svg';

import Button, { ButtonProps } from './Button';

interface KakaoLoginButtonProps extends ButtonProps {}

const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({ ...props }: KakaoLoginButtonProps) => {
  return (
    <Button
      css={[tw`flex items-center`, tw`m-[0.3rem] gap-2 bg-[#fee500] hover:bg-[#c7b000]`]}
      {...props}
    >
      <img css={[tw`w-[1.65rem] h-[1.65rem]`]} src={kakaoSvg} alt="kakao" />
      <span css={[tw`text-[#191919]`]}>Log in with kakao</span>
    </Button>
  );
};

export default KakaoLoginButton;
