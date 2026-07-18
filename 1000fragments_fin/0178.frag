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
	p *= 1.37;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.61;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.87) * 0.25, (time * 0.87) * 0.21)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h + (time * 0.87) * 0.14) * 8.2;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.095, 0.083, 0.016) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(4.775, 6.011, 7.246) + lv * 1.02 + (time * 0.87) * 1.00)) * line;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.036, 1.005, 0.935);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
