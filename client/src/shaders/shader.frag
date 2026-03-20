#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;  // Canvas size (width,height)
//uniform vec2 u_mouse;       // mouse position in screen pixels
uniform float u_time;       // Time in seconds since load

uniform vec4 u_bgColor;

// Plot a line on Y using a value between 0.0 - 1.0
float plot(vec2 st, float pct) {    
    return smoothstep(pct - 0.01, pct, st.y) - smoothstep(pct, pct + 0.01, st.y);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0),
                             6.0) - 3.0) - 1.0,
                     0.0,
                     1.0 );
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st - vec2(0.5);
	return 1.0 - smoothstep(_radius - (_radius * 0.01),
                         _radius + (_radius * 0.01),
                         dot(dist,dist) * 4.0);
}

void main() {
    // normalized variables
    vec2 st = gl_FragCoord.xy / u_resolution;
    //vec2 nmp = gl_FragCoord.xy / u_mouse;

    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 green = vec3(0.0, 1.0, 0.0);
    vec3 blue = vec3(0.0, 0.0, 1.0);
    vec3 magenta = vec3(1.0, 0.0, 1.0);

    vec4 color = u_bgColor;
    
    vec4 pct = vec4(vec3(st.x), 1.0);

    pct.r = smoothstep(0.0, 1.0, st.x);
    pct.g = sin(st.x * PI);
    pct.b = pow(st.x, 0.5);

    color = mix(color, vec4(magenta, 1.0), pct);

    // plot lines
    color = mix(color, vec4(red, 1.0), plot(st, pct.r));
    color = mix(color, vec4(green, 1.0), plot(st, pct.g));
    color = mix(color, vec4(blue, 1.0), plot(st, pct.b));

    gl_FragColor = color;
}