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
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.20;
	p = rot2((time * 0.56) * 1.34) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.79;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.56) * 0.14, (time * 0.56) * 0.37)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 14.9;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 14.9 + (time * 0.56) * 0.06, vec3(0.34, 0.46, 0.51), vec3(0.32, 0.31, 0.25), vec3(1.00, 0.91, 0.84), vec3(0.38, 0.47, 0.61)) * (1.0 - line * 0.82);
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 0.82 + (time * 0.56) * 4.84);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.009, 0.972, 1.020);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
