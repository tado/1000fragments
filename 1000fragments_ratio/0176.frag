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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.60) * 0.36), cos((time * 0.60) * 0.47)) * 0.20;
	p *= 1.13;
	p = rot2((time * 0.60) * -1.08) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 2.06;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.60) * 0.28, (time * 0.60) * -0.37)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h + (time * 0.60) * -0.24) * 7.2;
	float fc = fract(lv);
	float line = smoothstep(0.07, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.087, 0.051, 0.109) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.0, 0.70, 1.41) + lv * 0.72 + (time * 0.60) * 0.23)) * line;
	col *= 0.85 + 0.19 * sin(gl_FragCoord.y * 1.11 + (time * 0.60) * 8.00);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.35);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.979, 0.991) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
