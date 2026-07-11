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
	p.x += p.y * 0.59;
	vec3 col = vec3(0.03, 0.04, 0.05) * clamp(0.42 - p.y * 0.57, 0.0, 1.0);
	vec2 sc2 = floor(p * 13.48); vec2 sf2 = fract(p * 13.48) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.56) * smoothstep(0.05, 0.0, length(sf2)) * step(0.95, sh2) * (0.54 + 0.26 * sin((time * 0.67) * 2.53 + sh2 * 40.0));
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 0.87 + fa * 0.76 + (time * 0.67) * 0.29;
		float wv = vnoise2(vec2(xx, (time * 0.67) * 0.18 + fa * 7.31));
		float yc = -0.18 + (wv - 0.5) * 0.85;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 3.61) * exp(-max(dy, 0.0) * 4.14);
		bnd *= 0.58 + 0.32 * sin(xx * 3.06 + (time * 0.67) * 1.10 + fa);
		col += (vec3(0.40) + 0.25 * cos(vec3(0.0, 0.47, 0.95) + fa * 1.39 + (time * 0.67) * 0.71)) * bnd * 0.74;
	}
	col = col / (1.0 + col * 0.69);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.67)) * 100.0) - 0.5) * 0.08;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.056, 0.990, 0.944) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
