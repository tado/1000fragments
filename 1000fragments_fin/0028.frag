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
	if(resolution.x > resolution.y * 1.9) p = p.yx;
	p.y += sin(p.x * 1.00 + (time * 0.76) * 0.92) * 0.13;
	p.x = abs(p.x) - 0.23;
	p = p.yx;
	vec3 col = vec3(0.05, 0.04, 0.05) * clamp(0.62 - p.y * 0.43, 0.0, 1.0);
	vec2 sc2 = floor(p * 6.50); vec2 sf2 = fract(p * 6.50) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.76) * smoothstep(0.09, 0.0, length(sf2)) * step(0.94, sh2) * (0.52 + 0.33 * sin((time * 0.76) * 1.68 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.53 + fa * 0.69 + (time * 0.76) * 0.22;
		float wv = vnoise2(vec2(xx, (time * 0.76) * 0.30 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.76) * 0.46 + fa * 3.7));
		wv *= 0.667;
		float yc = 0.12 + (wv - 0.5) * 0.75;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 6.45) * exp(-max(dy, 0.0) * 3.42);
		bnd *= 0.65 + 0.35 * sin(xx * 3.24 + (time * 0.76) * 0.95 + fa);
		col += (vec3(0.43) + 0.15 * cos(vec3(6.269, 7.187, 8.105) + fa * 1.76 + (time * 0.76) * 0.24)) * bnd * 0.95;
	}
	col = col / (1.0 + col * 0.60);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(0.990, 0.993, 0.995);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
