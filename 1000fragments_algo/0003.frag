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
	p = p.yx;
	vec3 col = vec3(0.10, 0.08, 0.07) * clamp(0.43 - p.y * 0.33, 0.0, 1.0);
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.81 + fa * 1.86 + (time * 0.52) * 0.07;
		float wv = vnoise2(vec2(xx, (time * 0.52) * 0.17 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.52) * 0.29 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.05 + (wv - 0.5) * 1.31;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 9.85);
		bnd *= 0.68 + 0.31 * sin(xx * 3.74 + (time * 0.52) * 1.59 + fa);
		col = max(col, (vec3(0.38) + 0.13 * cos(vec3(0.0, 0.55, 1.10) + fa * 1.34 + (time * 0.52) * 0.58)) * bnd * 0.63);
	}
	col += (hash21(gl_FragCoord.xy + fract((time * 0.52)) * 100.0) - 0.5) * 0.07;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 1.000, 0.942) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
