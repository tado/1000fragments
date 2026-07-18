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
	p = p.yx;
	p.y = abs(p.y) - 0.50;
	vec3 col = vec3(0.09, 0.09, 0.11) * clamp(0.52 - p.y * 0.27, 0.0, 1.0);
	vec2 sc2 = floor(p * 10.36); vec2 sf2 = fract(p * 10.36) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.42) * smoothstep(0.04, 0.0, length(sf2)) * step(0.94, sh2) * (0.40 + 0.35 * sin((time * 0.64) * 3.26 + sh2 * 40.0));
	for(int ai = 0; ai < 4; ai++){
		float fa = float(ai);
		float xx = p.x * 1.75 + fa * 1.53 + (time * 0.64) * -0.25;
		float wv = vnoise2(vec2(xx, (time * 0.64) * 0.47 + fa * 7.31));
		float yc = 0.11 + (wv - 0.5) * 1.37;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 15.23);
		col += (vec3(0.44) + 0.15 * cos(vec3(3.018, 4.402, 5.787) + fa * 1.62 + (time * 0.64) * 0.30)) * bnd * 0.78;
	}
	col = col / (1.0 + col * 0.50);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.932, 0.992, 1.032);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
