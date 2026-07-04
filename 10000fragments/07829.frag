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
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.06;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.26, time * 0.32)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.28 * sin(p.x * 2.16 + time * 0.93) * sin(p.y * 3.46 - time * 0.74);
	float lv = (h + time * 0.14) * 8.3;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = palette((h * 2.0 - 1.0) * 0.63 + time * 0.03, vec3(0.58, 0.43, 0.53), vec3(0.34, 0.42, 0.45), vec3(0.78, 0.81, 1.10), vec3(0.66, 0.92, 0.47));
	col *= 1.0 - line * 0.83;
	col = mod(col * 2.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
