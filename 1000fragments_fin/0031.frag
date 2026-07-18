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
	p.x += p.y * -0.80;
	p.y = abs(p.y) - 0.51;
	vec3 col = vec3(0.03, 0.04, 0.06) * clamp(0.63 - p.y * 0.38, 0.0, 1.0);
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.80 + fa * 1.47 + (time * 0.71) * 0.22;
		float wv = vnoise2(vec2(xx, (time * 0.71) * 0.15 + fa * 7.31));
		float yc = -0.27 + (wv - 0.5) * 0.75;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.42) * exp(-max(dy, 0.0) * 1.28);
		bnd *= 0.58 + 0.33 * sin(xx * 3.95 + (time * 0.71) * 1.61 + fa);
		col += (vec3(0.32) + 0.16 * cos(vec3(4.941, 6.169, 7.398) + fa * 1.06 + (time * 0.71) * 0.44)) * bnd * 0.65;
	}
	col = col / (1.0 + col * 0.49);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.013, 0.985, 0.945);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
