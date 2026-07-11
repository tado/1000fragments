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
	p *= 1.24;
	p.x += p.y * -0.35;
	p *= 2.67;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.53;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.79) * -0.25, (time * 0.79) * 0.21)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.28 * sin(p.x * 3.96 + (time * 0.79) * 1.84) * sin(p.y * 3.18 - (time * 0.79) * 1.69);
	float lv = (h) * 16.0;
	float fc = fract(lv);
	float line = smoothstep(0.10, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.090, 0.023, 0.123) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 1.66, 3.33) + lv * 2.00 + (time * 0.79) * 0.85)) * line;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col = clamp(col, 0.0, 1.0) * vec3(0.994, 1.010, 0.996) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
