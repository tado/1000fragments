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
	p.y = abs(p.y);
	p.x += p.y * -0.64;
	p *= 2.29;
	p = rot2((time * 0.88) * -0.47) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 1.98;
	for(int hi = 0; hi < 3; hi++){ h += ha * vnoise2(hq + vec2((time * 0.88) * -0.30, (time * 0.88) * -0.19)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h = 1.0 - abs(h * 2.0 - 1.0);
	float lv = (h) * 8.6;
	float fc = fract(lv);
	float line = smoothstep(0.12, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.939, 0.749, 0.716) * (0.11 / (abs(((h * 2.0 - 1.0))) + 0.07));
	col = col / (1.0 + col);
	col *= 1.0 - line * 0.63;
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 2.45 + (time * 0.88) * 15.57);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.011, 0.996, 0.938);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
