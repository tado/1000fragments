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
	vec3 col = vec3(0.08, 0.12, 0.09) * clamp(0.36 - p.y * 0.47, 0.0, 1.0);
	vec2 sc2 = floor(p * 10.28); vec2 sf2 = fract(p * 10.28) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.79) * smoothstep(0.09, 0.0, length(sf2)) * step(0.95, sh2) * (0.56 + 0.23 * sin((time * 0.81) * 3.46 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.70 + fa * 1.66 + (time * 0.81) * -0.19;
		float wv = vnoise2(vec2(xx, (time * 0.81) * 0.16 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.81) * 0.60 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.28 + (wv - 0.5) * 1.54;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 26.68);
		col += (vec3(0.39) + 0.16 * cos(vec3(0.0, 1.33, 2.66) + fa * 1.74 + (time * 0.81) * 0.66)) * bnd * 1.13;
	}
	col = col / (1.0 + col * 0.45);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(0.977, 1.002, 0.927) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
