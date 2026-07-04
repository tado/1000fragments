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
	p *= 1.55;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.86;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.17, time * -0.38)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.12 * sin(p.x * 3.65 + time * 0.62) * sin(p.y * 2.28 - time * 0.90);
	float lv = (h) * 15.0;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + (h * 2.0 - 1.0) * 1.69 + time * 0.78);
	col *= 1.0 - line * 0.79;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
