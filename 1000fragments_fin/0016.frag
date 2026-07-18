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
	p.y = abs(p.y);
	p = p.yx;
	vec3 col = vec3(0.11, 0.09, 0.09) * clamp(0.65 - p.y * 0.48, 0.0, 1.0);
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.45 + fa * 0.78 + (time * 0.81) * 0.20;
		float wv = vnoise2(vec2(xx, (time * 0.81) * 0.21 + fa * 7.31));
		wv += 0.5 * vnoise2(vec2(xx * 2.3 + 5.1, (time * 0.81) * 0.34 + fa * 3.7));
		wv *= 0.667;
		float yc = -0.07 + (wv - 0.5) * 1.06;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 6.41) * exp(-max(dy, 0.0) * 4.20);
		col += (vec3(0.34) + 0.17 * cos(vec3(5.347, 7.437, 9.527) + fa * 1.45 + (time * 0.81) * 0.45)) * bnd * 0.72;
	}
	col = col / (1.0 + col * 0.46);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(0.979, 1.002, 0.936);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
