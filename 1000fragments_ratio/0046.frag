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
	vec3 col = vec3(0.05, 0.02, 0.04) * clamp(0.40 - p.y * 0.58, 0.0, 1.0);
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 2.17 + fa * 1.93 + (time * 0.65) * 0.25;
		float wv = vnoise2(vec2(xx, (time * 0.65) * 0.26 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.65) * 0.50 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.18 + (wv - 0.5) * 0.77;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 15.45);
		bnd *= 0.70 + 0.43 * sin(xx * 5.09 + (time * 0.65) * 1.90 + fa);
		col = max(col, (vec3(0.34) + 0.21 * cos(vec3(0.0, 0.94, 1.89) + fa * 0.95 + (time * 0.65) * 0.46)) * bnd * 0.80);
	}
	col += (hash21(gl_FragCoord.xy + fract((time * 0.65)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.944, 0.990, 1.046) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
