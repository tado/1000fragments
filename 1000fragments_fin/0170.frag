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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.11;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.91) * 0.17, (time * 0.91) * -0.27)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.29 * sin(p.x * 3.32 + (time * 0.91) * 1.74) * sin(p.y * 1.51 - (time * 0.91) * 1.16);
	float lv = (h) * 17.3;
	float fc = fract(lv);
	float line = smoothstep(0.15, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 17.3 + (time * 0.91) * 0.18, vec3(0.28, 0.24, 0.42), vec3(0.41, 0.38, 0.49), vec3(0.99, 0.97, 0.98), vec3(0.59, 0.77, 0.08)) * (1.0 - line * 0.88);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(0.966, 1.018, 0.949);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
