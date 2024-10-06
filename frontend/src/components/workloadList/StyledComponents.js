import styled from 'styled-components'
import { Box, IconButton, Label } from '@primer/react'

export const ThemedBox = styled(Box)`
    color: ${(props) => props.theme.colors.fg.default};
    padding: ${(props) => props.theme.space[4]};
    border-radius: ${(props) => props.theme.radii[2]};
    box-shadow: ${(props) => props.theme.shadows.medium};
    background-color: ${(props) => props.theme.colors.canvas.default};
`

export const StyledIconButton = styled(IconButton)`
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    color: ${(props) => props.theme.colors.fg.default} !important;
    
    &:hover {
        background: ${(props) => props.theme.colorScheme === 'light' 
            ? 'rgba(208, 215, 222, 0.32)' 
            : 'rgba(177, 186, 196, 0.12)'} !important;
    }
    
    &:active {
        background: ${(props) => props.theme.colorScheme === 'light' 
            ? 'rgba(208, 215, 222, 0.48)' 
            : 'rgba(177, 186, 196, 0.2)'} !important;
    }
    
    &:focus {
        outline: none !important;
    }
    
    &:focus-visible {
        box-shadow: ${(props) => props.theme.shadows.focus} !important;
    }
`

export const StyledFileLink = styled.span`
    cursor: pointer;
    color: ${(props) => props.theme.colors.accent.fg};
    &:hover {
        text-decoration: underline;
    }
`

export const StyledKebabIconButton = styled(IconButton)`
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    color: ${(props) => props.theme.colors.fg.default} !important;
    
    &:hover {
        background: ${(props) => props.theme.colorScheme === 'light' 
            ? 'rgba(208, 215, 222, 0.32)' 
            : 'rgba(177, 186, 196, 0.12)'} !important;
    }
`

export const StyledLabel = styled(Label)`
    color: ${(props) => props.theme.colors.fg.default};
    background-color: ${(props) => props.theme.colors.neutral.muted};
`