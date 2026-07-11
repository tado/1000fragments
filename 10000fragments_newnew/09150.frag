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
	p *= 2.79;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.52;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.39, time * 0.20)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + time * 0.25) * 14.8;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 14.8 + time * 0.08, vec3(0.50, 0.55, 0.56), vec3(0.34, 0.47, 0.41), vec3(0.77, 1.29, 1.06), vec3(0.11, 0.87, 0.76)) * (1.0 - line * 0.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
