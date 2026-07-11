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
	p.y = abs(p.y) - 0.44;
	p.y += sin(p.x * 2.88 + (time * 0.77) * 0.81) * 0.09;
	vec3 col = vec3(0.06, 0.04, 0.05) * clamp(0.34 - p.y * 0.34, 0.0, 1.0);
	vec2 sc2 = floor(p * 6.49); vec2 sf2 = fract(p * 6.49) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.67) * smoothstep(0.06, 0.0, length(sf2)) * step(0.93, sh2) * (0.54 + 0.26 * sin((time * 0.77) * 3.00 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.59 + fa * 0.52 + (time * 0.77) * 0.14;
		float wv = vnoise2(vec2(xx, (time * 0.77) * 0.47 + fa * 7.31));
		float yc = 0.22 + (wv - 0.5) * 0.78;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 10.81);
		col = max(col, (vec3(0.37) + 0.21 * cos(vec3(0.0, 0.95, 1.89) + fa * 1.61 + (time * 0.77) * 0.68)) * bnd * 0.90);
	}
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(1.050, 0.991, 0.911) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
