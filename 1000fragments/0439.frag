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
	p *= 1.46;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.37;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.12, time * -0.32)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h + time * 0.17) * 11.8;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 11.8 + time * 0.06, vec3(0.45, 0.41, 0.52), vec3(0.44, 0.40, 0.50), vec3(1.00, 0.94, 1.27), vec3(0.45, 0.70, 0.78)) * (1.0 - line * 0.64);
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 2.13 + time * 7.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
