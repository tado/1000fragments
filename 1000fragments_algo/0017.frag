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
	vec3 col = vec3(0.04, 0.06, 0.03) * clamp(0.67 - p.y * 0.31, 0.0, 1.0);
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 0.80 + fa * 1.79 + (time * 0.53) * 0.24;
		float wv = vnoise2(vec2(xx, (time * 0.53) * 0.49 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.53) * 0.33 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.10 + (wv - 0.5) * 1.33;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 7.62);
		bnd *= 0.61 + 0.35 * sin(xx * 5.65 + (time * 0.53) * 1.72 + fa);
		col += (vec3(0.26) + 0.29 * cos(vec3(0.0, 0.63, 1.25) + fa * 1.50 + (time * 0.53) * 0.30)) * bnd * 0.88;
	}
	col = col / (1.0 + col * 0.80);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.944, 0.999, 1.023) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
