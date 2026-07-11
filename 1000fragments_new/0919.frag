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
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.87;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.18;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.38, time * 0.31)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.21 * sin(p.x * 2.29 + time * 1.69) * sin(p.y * 2.18 - time * 1.41);
	float lv = (h + time * -0.14) * 7.9;
	float fc = fract(lv);
	float line = smoothstep(0.15, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 7.9 + time * 0.07, vec3(0.43, 0.48, 0.50), vec3(0.46, 0.42, 0.31), vec3(1.01, 0.89, 0.80), vec3(0.25, 0.25, 0.91)) * (1.0 - line * 0.76);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
