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
	p *= 0.98;
	p += vec2(sin((time * 0.60) * 0.87), cos((time * 0.60) * 0.77)) * 0.13;
	p = p.yx;
	vec3 col = vec3(0.07, 0.10, 0.07) * clamp(0.31 - p.y * 0.25, 0.0, 1.0);
	vec2 sc2 = floor(p * 8.83); vec2 sf2 = fract(p * 8.83) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.75) * smoothstep(0.09, 0.0, length(sf2)) * step(0.94, sh2) * (0.41 + 0.39 * sin((time * 0.60) * 2.78 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.10 + fa * 0.64 + (time * 0.60) * 0.29;
		float wv = vnoise2(vec2(xx, (time * 0.60) * 0.14 + fa * 7.31));
		float yc = 0.04 + (wv - 0.5) * 1.18;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 7.76);
		col += (vec3(0.45) + 0.26 * cos(vec3(0.0, 1.36, 2.72) + fa * 1.27 + (time * 0.60) * 0.42)) * bnd * 0.81;
	}
	col = col / (1.0 + col * 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col = clamp(col, 0.0, 1.0) * vec3(0.958, 1.022, 0.938) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
