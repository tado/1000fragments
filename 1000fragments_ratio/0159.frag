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
	p += vec2(sin((time * 0.73) * 1.02), cos((time * 0.73) * 0.74)) * 0.14;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.50;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.73) * -0.29, (time * 0.73) * 0.36)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 17.7;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.34, 0.24), vec3(0.47, 0.54, 0.50), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - line * 0.55;
	col = clamp((col - 0.5) * 1.69 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(0.931, 0.971, 1.025) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
