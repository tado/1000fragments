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
	p.y += sin(p.x * 1.53 + (time * 0.62) * 1.42) * 0.12;
	p.x = abs(p.x);
	vec3 col = vec3(0.07, 0.10, 0.09) * clamp(0.44 - p.y * 0.29, 0.0, 1.0);
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 0.95 + fa * 1.16 + (time * 0.62) * -0.18;
		float wv = vnoise2(vec2(xx, (time * 0.62) * 0.24 + fa * 7.31));
		float yc = 0.17 + (wv - 0.5) * 1.32;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 12.84);
		bnd *= 0.64 + 0.40 * sin(xx * 3.74 + (time * 0.62) * 1.19 + fa);
		col += (vec3(0.44) + 0.17 * cos(vec3(1.484, 2.290, 3.096) + fa * 0.48 + (time * 0.62) * 0.80)) * bnd * 1.15;
	}
	col = col / (1.0 + col * 0.77);
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.008, 0.975, 0.953);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
