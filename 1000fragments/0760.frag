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
	p *= 0.92;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.09;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.19, time * 0.46)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.23 * sin(p.x * 2.68 + time * 1.66) * sin(p.y * 3.05 - time * 1.30);
	float lv = (h + time * -0.17) * 17.9;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.042, 0.047, 0.131) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + lv * 1.43 + time * 1.04)) * line;
	col = mod(col * 1.97, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
