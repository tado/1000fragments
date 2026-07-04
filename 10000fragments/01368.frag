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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.93;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.32, time * 0.42)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.15 * sin(p.x * 2.68 + time * 1.12) * sin(p.y * 2.15 - time * 1.86);
	float lv = (h) * 14.9;
	float fc = fract(lv);
	float line = smoothstep(0.06, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.87, 0.77, 0.71) * (0.16 / (abs((h * 2.0 - 1.0)) + 0.07));
	col = col / (1.0 + col);
	col *= 1.0 - line * 0.68;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
