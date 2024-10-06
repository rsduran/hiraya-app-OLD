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
    border: none;
    box-shadow: none;
    color: ${(props) => props.theme.colors.fg.default};
    &:hover,
    &:focus {
        background: ${(props) => props.theme.colors.actionListItem.default.hoverBg} !important;
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
    border: none;
    box-shadow: none;
    color: ${(props) => props.theme.colors.fg.default};
    &:hover {
        background: ${(props) => props.theme.colors.actionListItem.default.hoverBg} !important;
    }
`

export const StyledLabel = styled(Label)`
    color: ${(props) => props.theme.colors.fg.default};
    background-color: ${(props) => props.theme.colors.neutral.muted};
`