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
	vec3 col = vec3(0.06, 0.06, 0.06) * clamp(0.30 - p.y * 0.32, 0.0, 1.0);
	vec2 sc2 = floor(p * 9.96); vec2 sf2 = fract(p * 9.96) - 0.5;
	float sh2 = hash21(sc2);
	col += vec3(0.62) * smoothstep(0.06, 0.0, length(sf2)) * step(0.95, sh2) * (0.50 + 0.37 * sin((time * 0.71) * 3.70 + sh2 * 40.0));
	for(int ai = 0; ai < 3; ai++){
		float fa = float(ai);
		float xx = p.x * 1.15 + fa * 0.87 + (time * 0.71) * 0.07;
		float wv = vnoise2(vec2(xx, (time * 0.71) * 0.28 + fa * 7.31));
		float yc = -0.32 + (wv - 0.5) * 0.89;
		float dy = p.y - yc;
		float bnd = exp(-abs(dy) * 7.44) * exp(-max(dy, 0.0) * 2.79);
		col = max(col, (vec3(0.26) + 0.14 * cos(vec3(5.252, 6.932, 8.612) + fa * 1.38 + (time * 0.71) * 0.18)) * bnd * 0.91);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.935, 0.996, 1.053);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
