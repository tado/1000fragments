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
	p *= 0.81;
	p = p.yx;
	vec3 col = vec3(0.05, 0.07, 0.08) * clamp(0.59 - p.y * 0.52, 0.0, 1.0);
	vec2 sc2 = floor(p * 8.50); vec2 sf2 = fract(p * 8.50) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.57) * smoothstep(0.05, 0.0, length(sf2)) * step(0.90, sh2) * (0.54 + 0.29 * sin((time * 0.90) * 3.89 + sh2 * 40.0));
	for(int ai = 0; ai < 6; ai++){
		float fa = float(ai);
		float xx = p.x * 2.01 + fa * 0.61 + (time * 0.90) * -0.06;
		float wv = vnoise2(vec2(xx, (time * 0.90) * 0.21 + fa * 7.31));
		float yc = 0.19 + (wv - 0.5) * 1.21;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 12.88);
		bnd *= 0.67 + 0.42 * sin(xx * 2.66 + (time * 0.90) * 1.78 + fa);
		col += (vec3(0.47) + 0.15 * cos(vec3(0.671, 1.933, 3.196) + fa * 1.48 + (time * 0.90) * 0.33)) * bnd * 0.57;
	}
	col = col / (1.0 + col * 0.57);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.029, 0.980, 0.960);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
