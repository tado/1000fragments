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
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.73) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.92;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2(time * -0.38, time * 0.40)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 9.8;
	float fc = fract(lv);
	float line = smoothstep(0.10, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.5 + 0.5 * (h * 2.0 - 1.0)) * vec3(0.77, 1.06, 0.77) + vec3(0.08, 0.16, 0.14);
	col *= 1.0 - line * 0.65;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
