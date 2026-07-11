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
	p *= 1.96;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.71;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.27, time * 0.44)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 9.7;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette(floor(lv) / 9.7 + time * 0.24, vec3(0.52, 0.46, 0.56), vec3(0.42, 0.42, 0.49), vec3(1.07, 1.26, 1.02), vec3(0.71, 0.31, 0.28)) * (1.0 - line * 0.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
