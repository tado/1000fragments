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
	p += vec2(sin((time * 0.73) * 0.64), cos((time * 0.73) * 0.78)) * 0.22;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.76;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.73) * -0.33, (time * 0.73) * 0.48)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.13 * sin(p.x * 2.44 + (time * 0.73) * 0.91) * sin(p.y * 1.58 - (time * 0.73) * 0.86);
	float lv = (h) * 12.0;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.5 + 0.5 * ((h * 2.0 - 1.0))) * vec3(0.49, 0.55, 0.57) + vec3(0.07, 0.05, 0.07);
	col *= 1.0 - line * 0.75;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.943, 1.000) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
