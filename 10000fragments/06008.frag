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
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.54;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.28, time * -0.30)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 7.2;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 7.2 + time * 0.27, vec3(0.41, 0.58, 0.57), vec3(0.35, 0.48, 0.38), vec3(1.08, 1.10, 0.81), vec3(0.50, 0.47, 0.59)) * (1.0 - line * 0.75);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.25 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
