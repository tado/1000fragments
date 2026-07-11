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
	vec3 col = vec3(0.04, 0.04, 0.04) * clamp(0.30 - p.y * 0.34, 0.0, 1.0);
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 1.31 + fa * 1.52 + (time * 0.57) * -0.28;
		float wv = vnoise2(vec2(xx, (time * 0.57) * 0.36 + fa * 7.31));
		float yc = 0.17 + (wv - 0.5) * 1.15;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 4.99) * exp(-max(dy, 0.0) * 4.95);
		bnd *= 0.57 + 0.43 * sin(xx * 5.88 + (time * 0.57) * 0.86 + fa);
		col = max(col, (vec3(0.34) + 0.20 * cos(vec3(0.0, 1.54, 3.07) + fa * 1.47 + (time * 0.57) * 0.18)) * bnd * 0.57);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(0.931, 0.974, 1.025) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
