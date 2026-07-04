uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	p = rot2(length(p) * 2.77 + time * 1.17) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.63;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.14, time * -0.22)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.28 * sin(p.x * 2.03 + time * 1.55) * sin(p.y * 3.03 - time * 1.69);
	float lv = (h) * 6.3;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * (h * 2.0 - 1.0), 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.36, 0.17), vec3(0.91, 0.97, 0.66), cc);
	col *= 1.0 - line * 0.90;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
