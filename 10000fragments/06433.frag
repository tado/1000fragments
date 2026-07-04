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
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.14;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * 0.14, time * 0.18)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.14 * sin(p.x * 3.21 + time * 1.06) * sin(p.y * 2.06 - time * 1.51);
	float lv = (h + time * -0.22) * 16.5;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette((h * 2.0 - 1.0) * 0.84 + time * 0.37, vec3(0.41, 0.51, 0.52), vec3(0.35, 0.41, 0.45), vec3(0.84, 1.21, 0.96), vec3(0.09, 0.03, 0.79));
	col *= 1.0 - line * 0.79;
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 1.26 + time * 7.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
