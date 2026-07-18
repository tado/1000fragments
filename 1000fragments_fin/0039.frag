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
	p.y = abs(p.y) - 0.31;
	vec3 col = vec3(0.03, 0.01, 0.02) * clamp(0.70 - p.y * 0.34, 0.0, 1.0);
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 2.13 + fa * 1.91 + (time * 0.90) * 0.18;
		float wv = vnoise2(vec2(xx, (time * 0.90) * 0.20 + fa * 7.31));
		float yc = 0.15 + (wv - 0.5) * 0.73;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 7.99) * exp(-max(dy, 0.0) * 2.96);
		bnd *= 0.56 + 0.35 * sin(xx * 2.19 + (time * 0.90) * 0.57 + fa);
		col += (vec3(0.46) + 0.16 * cos(vec3(0.138, 1.048, 1.958) + fa * 1.75 + (time * 0.90) * 0.14)) * bnd * 0.64;
	}
	col = col / (1.0 + col * 0.43);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.48));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.034, 1.013, 0.939);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
