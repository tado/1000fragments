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
	p *= 0.97;
	p.x = abs(p.x) - 0.50;
	p *= 1.66;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.82;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2((time * 0.74) * 0.30, (time * 0.74) * 0.25)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 8.6;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.082, 0.088, 0.010) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 1.39, 2.78) + lv * 1.26 + (time * 0.74) * 0.60)) * line;
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.938, 0.982, 1.058) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
