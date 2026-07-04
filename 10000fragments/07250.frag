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
	p *= 2.71;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.86;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * -0.24, time * 0.37)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.20 * sin(p.x * 3.54 + time * 1.91) * sin(p.y * 2.35 - time * 1.10);
	float lv = (h + time * -0.17) * 8.2;
	float fc = fract(lv);
	float line = smoothstep(0.09, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.082, 0.037, 0.050) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + lv * 0.81 + time * 0.74)) * line;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
