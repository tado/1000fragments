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
	p += vec2(sin((time * 0.80) * 0.36), cos((time * 0.80) * 0.90)) * 0.09;
	p.x += p.y * 0.33;
	vec3 col = vec3(0.05, 0.06, 0.07) * clamp(0.66 - p.y * 0.31, 0.0, 1.0);
	vec2 sc2 = floor(p * 12.60); vec2 sf2 = fract(p * 12.60) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.51) * smoothstep(0.07, 0.0, length(sf2)) * step(0.92, sh2) * (0.43 + 0.33 * sin((time * 0.80) * 1.93 + sh2 * 40.0));
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 1.59 + fa * 0.53 + (time * 0.80) * 0.05;
		float wv = vnoise2(vec2(xx, (time * 0.80) * 0.40 + fa * 7.31));
		float yc = 0.01 + (wv - 0.5) * 1.01;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.23) * exp(-max(dy, 0.0) * 2.13);
		col += (vec3(0.31) + 0.18 * cos(vec3(0.0, 0.52, 1.04) + fa * 1.52 + (time * 0.80) * 0.63)) * bnd * 1.13;
	}
	col = col / (1.0 + col * 0.72);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.952, 0.994, 0.947) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
