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
	p = rot2(time * -0.53) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.67;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2(time * -0.24, time * -0.38)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.25 * sin(p.x * 3.20 + time * 1.72) * sin(p.y * 2.75 - time * 1.69);
	float lv = (h + time * -0.17) * 8.0;
	float fc = fract(lv);
	float line = smoothstep(0.10, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.85, 0.22, 0.96) * (0.18 / (abs((h * 2.0 - 1.0)) + 0.05));
	col = col / (1.0 + col);
	col *= 1.0 - line * 0.87;
	col = mod(col * 1.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
