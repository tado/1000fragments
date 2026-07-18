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
	p.y = abs(p.y);
	p *= 0.79;
	p *= 0.97;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.40;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.76) * -0.34, (time * 0.76) * -0.43)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.23 * sin(p.x * 3.88 + (time * 0.76) * 0.77) * sin(p.y * 1.07 - (time * 0.76) * 1.34);
	float lv = (h + (time * 0.76) * -0.05) * 14.6;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(((h * 2.0 - 1.0)) * 1.07 + (time * 0.76) * 0.17, vec3(0.43, 0.39, 0.52), vec3(0.39, 0.33, 0.39), vec3(0.99, 1.01, 1.04), vec3(0.13, 0.20, 0.53));
	col *= 1.0 - line * 0.63;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.977, 0.998, 0.943);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
