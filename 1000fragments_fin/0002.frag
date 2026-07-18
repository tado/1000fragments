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
	p += vec2(sin((time * 0.79) * 0.48), cos((time * 0.79) * 1.10)) * 0.14;
	vec3 col = vec3(0.06, 0.05, 0.09) * clamp(0.66 - p.y * 0.39, 0.0, 1.0);
	vec2 sc2 = floor(p * 6.76); vec2 sf2 = fract(p * 6.76) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.70) * smoothstep(0.05, 0.0, length(sf2)) * step(0.92, sh2) * (0.49 + 0.26 * sin((time * 0.79) * 1.74 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 2.08 + fa * 1.81 + (time * 0.79) * -0.24;
		float wv = vnoise2(vec2(xx, (time * 0.79) * 0.38 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.79) * 0.54 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.21 + (wv - 0.5) * 1.23;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 11.14);
		bnd *= 0.56 + 0.37 * sin(xx * 3.08 + (time * 0.79) * 0.57 + fa);
		col += (vec3(0.39) + 0.21 * cos(vec3(5.753, 7.501, 9.248) + fa * 0.99 + (time * 0.79) * 0.43)) * bnd * 1.13;
	}
	col = col / (1.0 + col * 0.48);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.965, 1.014, 0.955);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
