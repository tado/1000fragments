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
	p.x += p.y * 0.31;
	p += vec2(sin((time * 0.69) * 0.72), cos((time * 0.69) * 0.58)) * 0.22;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 2.14 + (time * 0.69) * 0.35) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.11;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.69) * -0.43, (time * 0.69) * -0.47)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h + (time * 0.69) * -0.19) * 9.0;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	float cc = clamp(0.5 + 0.5 * ((h * 2.0 - 1.0)), 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.06, 0.05), vec3(0.66, 0.61, 0.68), cc);
	col *= 1.0 - line * 0.66;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.69)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 1.002, 0.984) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
