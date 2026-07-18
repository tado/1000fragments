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
	p.x += p.y * 0.55;
	vec2 q = p * 1.21 + vec2(18.35, 2.78);
	float nt = (time * 0.82) * 0.18;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 4; ni++){ n1 += na * vnoise2(nq + nt * 0.34); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float den = n1 * 1.05;
	den = 1.0 - abs(den * 2.0 - 1.0); den *= den;
	vec3 col = mix(vec3(0.012, 0.007, 0.056), vec3(0.273, 0.285, 0.739), smoothstep(0.15, 0.64, den));
	col = mix(col, vec3(0.604, 0.959, 1.000), smoothstep(0.62, 1.01, den));
	col += vec3(0.700, 0.990, 0.777) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.59;
	vec2 sc9 = floor(p * 9.60); vec2 sf9 = fract(p * 9.60) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.05, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.94, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.36 + 0.32 * sin((time * 0.82) * 3.45 + sh9 * 40.0));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.014, 0.988, 0.945);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
