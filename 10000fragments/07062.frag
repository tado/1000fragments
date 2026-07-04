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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.34;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * 0.14, time * -0.11)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.11 * sin(p.x * 2.87 + time * 1.53) * sin(p.y * 2.04 - time * 0.98);
	float lv = (h + time * 0.13) * 15.2;
	float fc = fract(lv);
	float line = smoothstep(0.13, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.058, 0.080, 0.126) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + lv * 0.52 + time * 0.63)) * line;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
