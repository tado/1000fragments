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
	p *= 1.59;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.67;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.10, time * -0.36)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.12 * sin(p.x * 1.01 + time * 1.48) * sin(p.y * 1.64 - time * 1.10);
	float lv = (h + time * 0.15) * 10.8;
	float fc = fract(lv);
	float line = smoothstep(0.15, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.060, 0.049, 0.028) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + lv * 1.15 + time * 0.80)) * line;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
