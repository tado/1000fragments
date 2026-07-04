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
	p *= 1.50;
	p = rot2(length(p) * 1.69 + time * 0.57) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.31;
	for(int hi = 0; hi < 4; hi++){ h += ha * vnoise2(hq + vec2(time * 0.48, time * -0.23)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.23 * sin(p.x * 2.69 + time * 1.73) * sin(p.y * 1.81 - time * 0.92);
	float lv = (h) * 15.9;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + (h * 2.0 - 1.0) * 3.37 + time * 0.00);
	col *= 1.0 - line * 0.87;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.87 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
