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
	p.x = abs(p.x);
	p.x += p.y * -0.79;
	vec3 col = vec3(0.02, 0.05, 0.01) * clamp(0.51 - p.y * 0.50, 0.0, 1.0);
	vec2 sc2 = floor(p * 12.01); vec2 sf2 = fract(p * 12.01) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.74) * smoothstep(0.07, 0.0, length(sf2)) * step(0.92, sh2) * (0.57 + 0.37 * sin((time * 0.57) * 3.92 + sh2 * 40.0));
	for(int ai = 0; ai < 7; ai++){
		float fa = float(ai);
		float xx = p.x * 1.34 + fa * 1.10 + (time * 0.57) * 0.05;
		float wv = vnoise2(vec2(xx, (time * 0.57) * 0.48 + fa * 7.31));
		float yc = 0.22 + (wv - 0.5) * 1.48;
		float dy = p.y - yc;
		float bnd = exp(-dy * dy * 20.35);
		col += (vec3(0.39) + 0.24 * cos(vec3(3.544, 4.720, 5.897) + fa * 1.10 + (time * 0.57) * 0.39)) * bnd * 0.89;
	}
	col = col / (1.0 + col * 0.88);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.930, 0.976, 1.031);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
