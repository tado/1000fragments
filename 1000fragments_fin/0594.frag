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
	p.y += sin(p.x * 2.55 + (time * 0.77) * 1.25) * 0.17;
	vec2 q = p * 1.29 + vec2(5.88, 16.76);
	float nt = (time * 0.77) * 0.31;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 4; ni++){ n1 += na * vnoise2(nq + nt * 0.50); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float den = n1 * 1.05;
	den = 1.0 - abs(den * 2.0 - 1.0); den *= den;
	vec3 col = mix(vec3(0.015, 0.075, 0.111), vec3(0.105, 0.425, 0.728), smoothstep(0.17, 0.69, den));
	col = mix(col, vec3(0.828, 0.954, 0.980), smoothstep(0.65, 0.97, den));
	col += vec3(0.749, 0.703, 0.936) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.35;
	vec2 sc9 = floor(p * 14.62); vec2 sf9 = fract(p * 14.62) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.07, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.92, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.39 + 0.41 * sin((time * 0.77) * 1.66 + sh9 * 40.0));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.976, 1.010, 0.952);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
