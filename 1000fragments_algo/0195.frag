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
	p.x += p.y * 0.48;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.63;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.59) * 0.16, (time * 0.59) * 0.34)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.17 * sin(p.x * 1.89 + (time * 0.59) * 0.92) * sin(p.y * 3.44 - (time * 0.59) * 1.40);
	float lv = (h + (time * 0.59) * 0.09) * 13.4;
	float fc = fract(lv);
	float line = smoothstep(0.10, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.5 + 0.5 * ((h * 2.0 - 1.0))) * vec3(0.45, 0.56, 0.49) + vec3(0.11, 0.07, 0.13);
	col *= 1.0 - line * 0.58;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.017, 0.952, 0.992) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
