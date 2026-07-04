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
	p *= 0.88;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.42;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.29, time * -0.11)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.18 * sin(p.x * 2.35 + time * 0.58) * sin(p.y * 3.00 - time * 1.88);
	float lv = (h) * 12.6;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.19, 0.93, 0.89) * (0.16 / (abs((h * 2.0 - 1.0)) + 0.04));
	col = col / (1.0 + col);
	col *= 1.0 - line * 0.89;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
