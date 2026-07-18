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
	vec3 col = vec3(0.07, 0.08, 0.12) * clamp(0.50 - p.y * 0.21, 0.0, 1.0);
	vec2 sc2 = floor(p * 8.87); vec2 sf2 = fract(p * 8.87) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.47) * smoothstep(0.08, 0.0, length(sf2)) * step(0.91, sh2) * (0.57 + 0.36 * sin((time * 0.71) * 2.76 + sh2 * 40.0));
	for(int ai = 0; ai < 5; ai++){
		float fa = float(ai);
		float xx = p.x * 0.95 + fa * 1.00 + (time * 0.71) * -0.28;
		float wv = vnoise2(vec2(xx, (time * 0.71) * 0.11 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.71) * 0.38 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.03 + (wv - 0.5) * 1.34;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.22) * exp(-max(dy, 0.0) * 2.49);
		col = max(col, (vec3(0.44) + 0.15 * cos(vec3(0.943, 2.379, 3.814) + fa * 1.47 + (time * 0.71) * 0.72)) * bnd * 0.57);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.987, 0.991, 1.005);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
