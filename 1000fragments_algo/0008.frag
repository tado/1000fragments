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
	vec3 col = vec3(0.05, 0.03, 0.02) * clamp(0.37 - p.y * 0.56, 0.0, 1.0);
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.83 + fa * 1.36 + (time * 0.70) * -0.08;
		float wv = vnoise2(vec2(xx, (time * 0.70) * 0.38 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.70) * 0.67 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.15 + (wv - 0.5) * 0.89;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 25.77);
		col = max(col, (vec3(0.34) + 0.15 * cos(vec3(0.0, 0.93, 1.85) + fa * 1.56 + (time * 0.70) * 0.13)) * bnd * 0.86);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.964, 0.998, 0.939) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
