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
	vec3 col = vec3(0.07, 0.07, 0.07) * clamp(0.66 - p.y * 0.26, 0.0, 1.0);
	vec2 sc2 = floor(p * 13.85); vec2 sf2 = fract(p * 13.85) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.53) * smoothstep(0.07, 0.0, length(sf2)) * step(0.94, sh2) * (0.53 + 0.38 * sin((time * 0.84) * 2.27 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 2.03 + fa * 1.85 + (time * 0.84) * 0.12;
		float wv = vnoise2(vec2(xx, (time * 0.84) * 0.17 + fa * 7.31));
		float yc = 0.29 + (wv - 0.5) * 1.56;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 16.67);
		bnd *= 0.67 + 0.34 * sin(xx * 2.33 + (time * 0.84) * 1.06 + fa);
		col += (vec3(0.28) + 0.20 * cos(vec3(0.0, 0.97, 1.94) + fa * 1.18 + (time * 0.84) * 0.78)) * bnd * 1.04;
	}
	col = col / (1.0 + col * 0.88);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.50));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.991, 0.942, 0.997) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
