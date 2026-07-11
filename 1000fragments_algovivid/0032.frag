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
	vec3 col = vec3(0.13, 0.08, 0.09) * clamp(0.50 - p.y * 0.55, 0.0, 1.0);
	vec2 sc2 = floor(p * 8.90); vec2 sf2 = fract(p * 8.90) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.80) * smoothstep(0.08, 0.0, length(sf2)) * step(0.90, sh2) * (0.60 + 0.22 * sin((time * 0.51) * 3.86 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.51 + fa * 1.78 + (time * 0.51) * 0.18;
		float wv = vnoise2(vec2(xx, (time * 0.51) * 0.28 + fa * 7.31));
		float yc = 0.08 + (wv - 0.5) * 1.41;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.35) * exp(-max(dy, 0.0) * 3.07);
		bnd *= 0.64 + 0.39 * sin(xx * 4.20 + (time * 0.51) * 1.05 + fa);
		col += (vec3(0.25) + 0.23 * cos(vec3(0.0, 0.93, 1.86) + fa * 0.64 + (time * 0.51) * 0.39)) * bnd * 0.58;
	}
	col = col / (1.0 + col * 0.75);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 1.012, 0.999) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
