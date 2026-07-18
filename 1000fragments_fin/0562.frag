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
	vec2 q = p * 1.97 + vec2(13.98, 7.50);
	float nt = (time * 0.57) * 0.20;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 5; ni++){ n1 += na * vnoise2(nq + nt * 0.95); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float n2 = 0.0; na = 0.5; nq = q * 1.7 + n1 * 1.18 + 31.0;
	for(int mi = 0; mi < 2; mi++){ n2 += na * vnoise2(nq - nt * 0.63); nq = nq * 2.03 + 9.0; na *= 0.55; }
	float den = n1 * 0.60 + n2 * 0.55;
	vec3 col = mix(vec3(0.014, 0.031, 0.102), vec3(0.128, 0.405, 0.747), smoothstep(0.22, 0.62, den));
	col = mix(col, vec3(0.833, 0.940, 1.000), smoothstep(0.71, 1.10, den));
	col += vec3(0.993, 0.768, 0.586) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.54;
	vec2 sc9 = floor(p * 15.42); vec2 sf9 = fract(p * 15.42) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.09, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.90, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.43 + 0.44 * sin((time * 0.57) * 3.24 + sh9 * 40.0));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.029, 0.996, 0.937);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
