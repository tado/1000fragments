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
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	p = rot2(length(p) * 2.85 + time * 0.43) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.00;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * 0.36, time * 0.35)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.30 * sin(p.x * 3.80 + time * 0.64) * sin(p.y * 2.29 - time * 1.04);
	float lv = (h) * 12.1;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette((h * 2.0 - 1.0) * 0.65 + time * 0.26, vec3(0.53, 0.47, 0.46), vec3(0.40, 0.49, 0.47), vec3(1.08, 0.92, 1.30), vec3(0.86, 0.84, 0.34));
	col *= 1.0 - line * 0.86;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
