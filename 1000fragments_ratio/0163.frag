uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.55) * 0.83), cos((time * 0.55) * 0.44)) * 0.18;
	p.y += sin(p.x * 2.16 + (time * 0.55) * 1.15) * 0.13;
	p *= 1.45;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.93;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.55) * -0.36, (time * 0.55) * 0.28)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.16 * sin(p.x * 3.09 + (time * 0.55) * 0.81) * sin(p.y * 3.10 - (time * 0.55) * 1.68);
	float lv = (h) * 13.3;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.39, 0.31), vec3(0.79, 0.60, 0.66), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - line * 0.75;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.17));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.949, 0.964, 1.041) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
