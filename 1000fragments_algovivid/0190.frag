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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p *= 2.63;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.07;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.73) * 0.16, (time * 0.73) * -0.15)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.29 * sin(p.x * 2.23 + (time * 0.73) * 0.55) * sin(p.y * 2.04 - (time * 0.73) * 0.97);
	float lv = (h + (time * 0.73) * 0.24) * 8.9;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.30, 0.39), vec3(0.40, 0.60, 0.39), smoothstep(0.0, 1.0, cc));
	col *= 1.0 - line * 0.68;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col = clamp(col, 0.0, 1.0) * vec3(0.931, 0.994, 1.050) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
