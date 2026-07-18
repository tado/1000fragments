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
	p.x += p.y * 0.29;
	p *= 0.91;
	vec3 col = vec3(0.05, 0.05, 0.08) * clamp(0.47 - p.y * 0.55, 0.0, 1.0);
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 1.68 + fa * 1.08 + (time * 0.66) * 0.23;
		float wv = vnoise2(vec2(xx, (time * 0.66) * 0.21 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.66) * 0.41 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.12 + (wv - 0.5) * 0.96;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 25.43);
		col += (vec3(0.25) + 0.27 * cos(vec3(1.891, 3.599, 5.307) + fa * 1.34 + (time * 0.66) * 0.24)) * bnd * 0.59;
	}
	col = col / (1.0 + col * 0.49);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.004, 0.989, 0.998);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
