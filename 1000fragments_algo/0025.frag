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
	vec3 col = vec3(0.03, 0.06, 0.05) * clamp(0.59 - p.y * 0.24, 0.0, 1.0);
	vec2 sc2 = floor(p * 9.29); vec2 sf2 = fract(p * 9.29) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.49) * smoothstep(0.08, 0.0, length(sf2)) * step(0.95, sh2) * (0.55 + 0.27 * sin((time * 0.85) * 2.35 + sh2 * 40.0));
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 1.95 + fa * 1.17 + (time * 0.85) * 0.29;
		float wv = vnoise2(vec2(xx, (time * 0.85) * 0.38 + fa * 7.31));
		float yc = 0.25 + (wv - 0.5) * 1.01;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 15.09);
		bnd *= 0.56 + 0.35 * sin(xx * 5.52 + (time * 0.85) * 1.01 + fa);
		col = max(col, (vec3(0.37) + 0.18 * cos(vec3(0.0, 0.83, 1.65) + fa * 1.09 + (time * 0.85) * 0.72)) * bnd * 0.85);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 1.009, 0.942) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
