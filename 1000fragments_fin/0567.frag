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
	p.x = abs(p.x) - 0.51;
	p *= 1.55;
	vec2 q = p * 1.97 + vec2(3.24, 2.13);
	float nt = (time * 0.72) * 0.13;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 5; ni++){ n1 += na * vnoise2(nq + nt * 0.64); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float den = n1 * 1.05;
	vec3 col = mix(vec3(0.115, 0.059, 0.150), vec3(0.749, 0.330, 0.455), smoothstep(0.16, 0.76, den));
	col = mix(col, vec3(1.000, 0.932, 0.854), smoothstep(0.61, 1.08, den));
	col += vec3(0.963, 0.564, 0.306) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.49;
	vec2 sc9 = floor(p * 12.72); vec2 sf9 = fract(p * 12.72) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.08, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.95, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.46 + 0.37 * sin((time * 0.72) * 1.56 + sh9 * 40.0));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(0.925, 0.990, 1.039);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
