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
	p.x = abs(p.x);
	p *= 1.06;
	p.x *= resolution.x / resolution.y;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.61;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.56) * 0.33, (time * 0.56) * 0.25)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 12.0;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.030, 0.078, 0.118) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 0.59, 1.18) + lv * 0.81 + (time * 0.56) * 0.57)) * line;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.992, 0.944, 1.024) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
