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
	p *= 1.07;
	vec3 col = vec3(0.04, 0.05, 0.04) * clamp(0.39 - p.y * 0.58, 0.0, 1.0);
	vec2 sc2 = floor(p * 12.91); vec2 sf2 = fract(p * 12.91) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.63) * smoothstep(0.08, 0.0, length(sf2)) * step(0.92, sh2) * (0.56 + 0.37 * sin((time * 0.85) * 2.40 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 1.87 + fa * 1.81 + (time * 0.85) * 0.28;
		float wv = vnoise2(vec2(xx, (time * 0.85) * 0.45 + fa * 7.31));
		float yc = -0.23 + (wv - 0.5) * 0.67;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 19.01);
		bnd *= 0.62 + 0.43 * sin(xx * 3.90 + (time * 0.85) * 1.66 + fa);
		col += (vec3(0.26) + 0.15 * cos(vec3(4.768, 6.119, 7.471) + fa * 1.74 + (time * 0.85) * 0.51)) * bnd * 1.00;
	}
	col = col / (1.0 + col * 0.44);
	col *= 0.84 + 0.10 * sin(gl_FragCoord.y * 1.86 + (time * 0.85) * 9.01);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.012, 0.955, 1.001);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
