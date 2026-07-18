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
	p.x += p.y * -0.32;
	p.y = abs(p.y) - 0.23;
	p.x *= resolution.x / resolution.y;
	p *= 1.60;
	p = rot2(length(p) * 3.50 + (time * 0.62) * 0.79) * p;
	float h = 0.0; float ha = 0.5; vec2 hq = p * 3.63;
	for(int hi = 0; hi < 5; hi++){ h += ha * vnoise2(hq + vec2((time * 0.62) * 0.22, (time * 0.62) * -0.45)); hq = hq * 2.03 + 1.7; ha *= 0.5; }
	h += 0.13 * sin(p.x * 1.58 + (time * 0.62) * 1.76) * sin(p.y * 3.86 - (time * 0.62) * 1.84);
	float lv = (h) * 14.2;
	float fc = fract(lv);
	float line = smoothstep(0.11, 0.0, min(fc, 1.0 - fc));
	vec3 col = vec3(0.094, 0.012, 0.035) * (1.0 - line);
	col += (0.5 + 0.5 * cos(vec3(0.441, 1.943, 3.446) + lv * 1.54 + (time * 0.62) * 0.51)) * line;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.988, 0.991, 0.999);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
