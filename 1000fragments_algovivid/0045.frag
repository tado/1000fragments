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
	p.y += sin(p.x * 1.45 + (time * 0.75) * 1.06) * 0.05;
	p.x += p.y * -0.35;
	vec3 col = vec3(0.08, 0.10, 0.09) * clamp(0.57 - p.y * 0.37, 0.0, 1.0);
	vec2 sc2 = floor(p * 9.63); vec2 sf2 = fract(p * 9.63) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.70) * smoothstep(0.04, 0.0, length(sf2)) * step(0.93, sh2) * (0.55 + 0.24 * sin((time * 0.75) * 3.37 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 2.18 + fa * 1.38 + (time * 0.75) * 0.27;
		float wv = vnoise2(vec2(xx, (time * 0.75) * 0.46 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.75) * 0.63 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.14 + (wv - 0.5) * 1.33;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 17.35);
		bnd *= 0.62 + 0.44 * sin(xx * 3.12 + (time * 0.75) * 0.54 + fa);
		col = max(col, (vec3(0.43) + 0.12 * cos(vec3(0.0, 1.46, 2.91) + fa * 1.35 + (time * 0.75) * 0.40)) * bnd * 0.70);
	}
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col = clamp(col, 0.0, 1.0) * vec3(1.047, 0.990, 0.943) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
