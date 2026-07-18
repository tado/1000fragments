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
	vec3 col = vec3(0.06, 0.02, 0.01) * clamp(0.31 - p.y * 0.54, 0.0, 1.0);
	vec2 sc2 = floor(p * 7.63); vec2 sf2 = fract(p * 7.63) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.56) * smoothstep(0.08, 0.0, length(sf2)) * step(0.94, sh2) * (0.52 + 0.37 * sin((time * 0.72) * 2.09 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 1.37 + fa * 1.32 + (time * 0.72) * 0.26;
		float wv = vnoise2(vec2(xx, (time * 0.72) * 0.26 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.72) * 0.49 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.10 + (wv - 0.5) * 1.57;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 10.86);
		col += (vec3(0.27) + 0.18 * cos(vec3(2.533, 4.424, 6.316) + fa * 0.41 + (time * 0.72) * 0.33)) * bnd * 0.80;
	}
	col = col / (1.0 + col * 0.55);
	col *= 0.88 + 0.15 * sin(gl_FragCoord.y * 1.99 + (time * 0.72) * 4.98);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.000, 1.011, 0.986);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
