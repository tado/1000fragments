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
	p.y = abs(p.y);
	p = p.yx;
	vec3 col = vec3(0.04, 0.06, 0.05) * clamp(0.55 - p.y * 0.29, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 0.93 + fa * 0.89 + (time * 0.51) * -0.21;
		float wv = vnoise2(vec2(xx, (time * 0.51) * 0.43 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.51) * 0.47 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.27 + (wv - 0.5) * 0.71;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 17.43);
		col += (vec3(0.43) + 0.21 * cos(vec3(0.0, 0.80, 1.61) + fa * 1.57 + (time * 0.51) * 0.28)) * bnd * 1.08;
	}
	col = col / (1.0 + col * 0.78);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.944, 1.007) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
