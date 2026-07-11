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
	p.x += p.y * 0.60;
	vec3 col = vec3(0.05, 0.03, 0.03) * clamp(0.45 - p.y * 0.47, 0.0, 1.0);
	vec2 sc2 = floor(p * 12.28); vec2 sf2 = fract(p * 12.28) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.49) * smoothstep(0.04, 0.0, length(sf2)) * step(0.93, sh2) * (0.57 + 0.24 * sin((time * 0.50) * 3.79 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.66 + fa * 0.85 + (time * 0.50) * 0.14;
		float wv = vnoise2(vec2(xx, (time * 0.50) * 0.35 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.50) * 0.49 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.30 + (wv - 0.5) * 1.20;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.36) * exp(-max(dy, 0.0) * 4.84);
		col += (vec3(0.46) + 0.29 * cos(vec3(0.0, 0.58, 1.16) + fa * 0.71 + (time * 0.50) * 0.57)) * bnd * 0.90;
	}
	col = col / (1.0 + col * 0.60);
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.989, 1.027, 0.928) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
