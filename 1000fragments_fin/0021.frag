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
	p.y += sin(p.x * 1.52 + (time * 0.73) * 0.68) * 0.11;
	vec3 col = vec3(0.05, 0.07, 0.05) * clamp(0.57 - p.y * 0.30, 0.0, 1.0);
	vec2 sc2 = floor(p * 7.42); vec2 sf2 = fract(p * 7.42) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.62) * smoothstep(0.06, 0.0, length(sf2)) * step(0.91, sh2) * (0.54 + 0.30 * sin((time * 0.73) * 2.65 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.36 + fa * 1.28 + (time * 0.73) * 0.05;
		float wv = vnoise2(vec2(xx, (time * 0.73) * 0.35 + fa * 7.31));
		float yc = -0.33 + (wv - 0.5) * 1.59;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 5.78) * exp(-max(dy, 0.0) * 4.53);
		bnd *= 0.67 + 0.37 * sin(xx * 3.25 + (time * 0.73) * 1.71 + fa);
		col += (vec3(0.32) + 0.22 * cos(vec3(1.286, 2.267, 3.248) + fa * 1.12 + (time * 0.73) * 0.66)) * bnd * 0.89;
	}
	col = col / (1.0 + col * 0.87);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.004, 0.959, 1.015);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
