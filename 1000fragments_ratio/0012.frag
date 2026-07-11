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
	vec3 col = vec3(0.06, 0.04, 0.06) * clamp(0.60 - p.y * 0.34, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.92 + fa * 1.92 + (time * 0.71) * -0.15;
		float wv = vnoise2(vec2(xx, (time * 0.71) * 0.30 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.71) * 0.45 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.34 + (wv - 0.5) * 0.74;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 24.27);
		bnd *= 0.56 + 0.36 * sin(xx * 4.35 + (time * 0.71) * 0.72 + fa);
		col += (vec3(0.45) + 0.20 * cos(vec3(0.0, 0.93, 1.86) + fa * 0.84 + (time * 0.71) * 0.39)) * bnd * 1.15;
	}
	col = col / (1.0 + col * 0.85);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 1.020, 0.936) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
