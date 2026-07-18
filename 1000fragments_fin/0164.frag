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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.21;
	p.x = abs(p.x) - 0.45;
	p.x *= resolution.x / resolution.y;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.27;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.91) * 0.31, (time * 0.91) * -0.22)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h + (time * 0.91) * -0.08) * 6.2;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 6.2 + (time * 0.91) * 0.02, vec3(0.28, 0.41, 0.28), vec3(0.25, 0.26, 0.19), vec3(0.97, 1.02, 0.96), vec3(0.06, 0.22, 0.06)) * (1.0 - line * 0.77);
	col *= 0.82 + 0.13 * sin(gl_FragCoord.y * 2.62 + (time * 0.91) * 7.54);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.008, 0.948, 1.011);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
