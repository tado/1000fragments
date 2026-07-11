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
	p *= 2.58;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.77;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.63) * -0.41, (time * 0.63) * -0.45)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.13 * sin(p.x * 2.05 + (time * 0.63) * 1.65) * sin(p.y * 2.47 - (time * 0.63) * 1.25);
	float lv = (h + (time * 0.63) * 0.21) * 8.1;
	float fc = fract(lv);
	float line = smoothstep(0.06, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.006, 0.097, 0.053) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 0.66, 1.33) + lv * 0.93 + (time * 0.63) * 0.97)) * line;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.954, 1.000, 0.928) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
