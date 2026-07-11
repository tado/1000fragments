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
	p = p.yx;
	vec3 col = vec3(0.10, 0.12, 0.09) * clamp(0.41 - p.y * 0.46, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 2.10 + fa * 1.80 + (time * 0.50) * -0.26;
		float wv = vnoise2(vec2(xx, (time * 0.50) * 0.15 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.50) * 0.20 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.21 + (wv - 0.5) * 1.08;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 21.04);
		bnd *= 0.59 + 0.32 * sin(xx * 4.86 + (time * 0.50) * 1.72 + fa);
		col += (vec3(0.36) + 0.28 * cos(vec3(0.0, 1.33, 2.66) + fa * 1.06 + (time * 0.50) * 0.73)) * bnd * 1.13;
	}
	col = col / (1.0 + col * 0.52);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.50)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col = clamp(col, 0.0, 1.0) * vec3(1.008, 1.005, 0.993) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
