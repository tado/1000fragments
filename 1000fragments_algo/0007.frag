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
	p.y += sin(p.x * 1.49 + (time * 0.62) * 1.19) * 0.09;
	p.x = abs(p.x);
	p = p.yx;
	vec3 col = vec3(0.07, 0.12, 0.12) * clamp(0.37 - p.y * 0.41, 0.0, 1.0);
	vec2 sc2 = floor(p * 12.34); vec2 sf2 = fract(p * 12.34) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.65) * smoothstep(0.09, 0.0, length(sf2)) * step(0.94, sh2) * (0.57 + 0.30 * sin((time * 0.62) * 2.85 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.66 + fa * 1.78 + (time * 0.62) * -0.20;
		float wv = vnoise2(vec2(xx, (time * 0.62) * 0.11 + fa * 7.31));
		float yc = 0.11 + (wv - 0.5) * 1.59;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 29.09);
		col += (vec3(0.31) + 0.29 * cos(vec3(0.0, 0.75, 1.49) + fa * 0.53 + (time * 0.62) * 0.29)) * bnd * 1.15;
	}
	col = col / (1.0 + col * 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.984, 1.012, 0.993) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
