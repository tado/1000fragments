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
	vec3 col = vec3(0.02, 0.08, 0.08) * clamp(0.63 - p.y * 0.45, 0.0, 1.0);
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.29 + fa * 1.95 + (time * 0.61) * 0.25;
		float wv = vnoise2(vec2(xx, (time * 0.61) * 0.26 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.61) * 0.44 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.29 + (wv - 0.5) * 1.56;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 4.30) * exp(-max(dy, 0.0) * 1.72);
		bnd *= 0.64 + 0.39 * sin(xx * 3.60 + (time * 0.61) * 1.61 + fa);
		col += (vec3(0.26) + 0.14 * cos(vec3(0.0, 0.94, 1.87) + fa * 1.44 + (time * 0.61) * 0.28)) * bnd * 0.97;
	}
	col = col / (1.0 + col * 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(1.039, 1.003, 0.947) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
