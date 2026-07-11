uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.67) * 0.40), cos((time * 0.67) * 1.10)) * 0.15;
	p.y = abs(p.y);
	p *= 2.75;
	p = rot2((time * 0.67) * -1.22) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.88;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.67) * 0.16, (time * 0.67) * 0.35)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + (time * 0.67) * 0.12) * 14.6;
	float fc = fract(lv);
	float line = smoothstep(0.08, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 14.6 + (time * 0.67) * 0.26, vec3(0.29, 0.35, 0.37), vec3(0.16, 0.11, 0.12), vec3(0.44, 0.87, 0.82), vec3(0.92, 0.83, 0.96)) * (1.0 - line * 0.86);
	col = clamp((col - 0.5) * 2.20 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col = clamp(col, 0.0, 1.0) * vec3(1.044, 0.979, 0.943) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
