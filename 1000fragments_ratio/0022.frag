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
	vec3 col = vec3(0.08, 0.10, 0.06) * clamp(0.53 - p.y * 0.54, 0.0, 1.0);
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 1.89 + fa * 1.67 + (time * 0.67) * 0.08;
		float wv = vnoise2(vec2(xx, (time * 0.67) * 0.22 + fa * 7.31));
		float yc = 0.07 + (wv - 0.5) * 1.39;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 4.70) * exp(-max(dy, 0.0) * 1.52);
		bnd *= 0.66 + 0.35 * sin(xx * 5.84 + (time * 0.67) * 1.63 + fa);
		col += (vec3(0.47) + 0.18 * cos(vec3(0.0, 0.90, 1.79) + fa * 1.62 + (time * 0.67) * 0.73)) * bnd * 0.71;
	}
	col = col / (1.0 + col * 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.035, 1.003, 0.917) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
