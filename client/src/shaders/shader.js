const shader = `
#ifdef GL_ES
    precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load
uniform vec4 u_bgColor;

void main() {
    vec2 np = gl_FragCoord.xy / u_resolution;
    vec2 nmp = gl_FragCoord.xy / u_mouse;

    vec4 tcol = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);
    vec4 red = vec4(1.0, 0.0, 1.0, 1.0);

	gl_FragColor = red;
}
`

export default shader;