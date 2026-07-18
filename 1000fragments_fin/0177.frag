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
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -2.60 + (time * 0.60) * 0.56) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.03;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.60) * -0.11, (time * 0.60) * 0.12)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	float lv = (h) * 8.1;
	float fc = fract(lv);
	float line = smoothstep(0.14, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.5 + 0.5 * ((h * 2.0 - 1.0))) * vec3(0.45, 0.58, 0.54) + vec3(0.09, 0.09, 0.13);
	col *= 1.0 - line * 0.68;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.030, 0.986, 0.947);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
