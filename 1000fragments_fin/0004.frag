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
	vec3 col = vec3(0.11, 0.07, 0.10) * clamp(0.41 - p.y * 0.50, 0.0, 1.0);
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 0.93 + fa * 1.00 + (time * 0.88) * -0.09;
		float wv = vnoise2(vec2(xx, (time * 0.88) * 0.33 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.88) * 0.25 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.09 + (wv - 0.5) * 0.64;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 6.22) * exp(-max(dy, 0.0) * 3.56);
		bnd *= 0.63 + 0.37 * sin(xx * 4.63 + (time * 0.88) * 1.29 + fa);
		col += (vec3(0.47) + 0.12 * cos(vec3(4.467, 5.717, 6.966) + fa * 1.35 + (time * 0.88) * 0.26)) * bnd * 0.95;
	}
	col = col / (1.0 + col * 0.82);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.982, 1.004, 0.949);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
