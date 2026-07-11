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
	p.y += sin(p.x * 2.20 + (time * 0.54) * 1.20) * 0.14;
	p = p.yx;
	vec3 col = vec3(0.07, 0.10, 0.07) * clamp(0.51 - p.y * 0.27, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.59 + fa * 1.02 + (time * 0.54) * 0.15;
		float wv = vnoise2(vec2(xx, (time * 0.54) * 0.31 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.54) * 0.62 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.23 + (wv - 0.5) * 1.32;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 8.78);
		bnd *= 0.67 + 0.37 * sin(xx * 3.86 + (time * 0.54) * 1.53 + fa);
		col += (vec3(0.28) + 0.26 * cos(vec3(0.0, 1.25, 2.50) + fa * 1.31 + (time * 0.54) * 0.17)) * bnd * 0.85;
	}
	col = col / (1.0 + col * 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.941, 0.978, 1.035) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
