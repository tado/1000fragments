uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.73;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.27 + 0.09 * sin(t * 1.02 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.87;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.66) * p * 13.46;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.53;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.12, 0.12, 0.20), vec3(0.76, 0.89, 0.88), v);
	col *= 0.81 + 0.12 * sin(gl_FragCoord.y * 2.20 + time * 14.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
