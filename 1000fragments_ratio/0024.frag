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
	if(resolution.x > resolution.y * 1.9) p = p.yx;
	p = p.yx;
	vec3 col = vec3(0.08, 0.09, 0.07) * clamp(0.62 - p.y * 0.37, 0.0, 1.0);
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.25 + fa * 0.85 + (time * 0.57) * -0.22;
		float wv = vnoise2(vec2(xx, (time * 0.57) * 0.12 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.57) * 0.17 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.17 + (wv - 0.5) * 1.41;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.63) * exp(-max(dy, 0.0) * 3.96);
		bnd *= 0.68 + 0.43 * sin(xx * 3.66 + (time * 0.57) * 1.42 + fa);
		col = max(col, (vec3(0.41) + 0.14 * cos(vec3(0.0, 1.62, 3.23) + fa * 0.90 + (time * 0.57) * 0.25)) * bnd * 0.68);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col = clamp(col, 0.0, 1.0) * vec3(0.917, 0.975, 1.030) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
