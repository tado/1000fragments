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
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.30;
	p.y += sin(p.x * 1.30 + (time * 0.63) * 0.65) * 0.07;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.62;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.63) * 0.28, (time * 0.63) * 0.48)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 14.9;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.5 + 0.5 * ((h * 2.0 - 1.0))) * vec3(0.54, 0.40, 0.42) + vec3(0.08, 0.05, 0.10);
	col *= 1.0 - line * 0.53;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col = clamp(col, 0.0, 1.0) * vec3(1.002, 0.961, 1.029) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
