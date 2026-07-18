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
	vec2 q = p * 2.26 + vec2(10.94, 3.92);
	float nt = (time * 0.71) * 0.20;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 5; ni++){ n1 += na * vnoise2(nq + nt * 0.43); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float den = n1 * 1.05;
	den = 1.0 - abs(den * 2.0 - 1.0); den *= den;
	vec3 col = mix(vec3(0.084, 0.064, 0.059), vec3(0.717, 0.278, 0.177), smoothstep(0.19, 0.79, den));
	col = mix(col, vec3(1.000, 0.827, 0.659), smoothstep(0.71, 1.04, den));
	col += vec3(0.888, 0.253, 0.237) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.66;
	vec2 sc9 = floor(p * 17.67); vec2 sf9 = fract(p * 17.67) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.09, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.91, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.54 + 0.26 * sin((time * 0.71) * 2.66 + sh9 * 40.0));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.983, 1.023, 0.950);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
