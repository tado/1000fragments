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
	p.x = abs(p.x);
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.14;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.66) * -0.39, (time * 0.66) * -0.34)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.11 * sin(p.x * 1.33 + (time * 0.66) * 0.83) * sin(p.y * 3.99 - (time * 0.66) * 1.57);
	float lv = (h + (time * 0.66) * 0.19) * 11.1;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.022, 0.041, 0.030) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 1.60, 3.20) + lv * 1.40 + (time * 0.66) * 0.42)) * line;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.47 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 1.016, 1.002) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
