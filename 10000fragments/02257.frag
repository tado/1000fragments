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


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.26;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.21, time * -0.26)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 8.9;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.91, 0.85, 0.82) * (0.11 / (abs((h * 2.0 - 1.0)) + 0.05));
	col = col / (1.0 + col);
	col *= 1.0 - line * 0.59;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
