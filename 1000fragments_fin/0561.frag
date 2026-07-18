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
	vec2 q = p * 2.59 + vec2(2.83, 5.94);
	float nt = (time * 0.69) * 0.19;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 4; ni++){ n1 += na * vnoise2(nq + nt * 0.77); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float den = n1 * 1.05;
	vec3 col = mix(vec3(0.012, 0.077, 0.109), vec3(0.158, 0.591, 0.494), smoothstep(0.11, 0.68, den));
	col = mix(col, vec3(0.984, 0.958, 0.880), smoothstep(0.63, 0.96, den));
	col += vec3(0.892, 0.892, 0.862) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.33;
	vec2 sc9 = floor(p * 11.60); vec2 sf9 = fract(p * 11.60) - 0.5;
	float sh9 = hash21(sc9);
	float st9 = smoothstep(0.07, 0.0, length(sf9 + (vec2(hash21(sc9 + 3.1), hash21(sc9 + 5.7)) - 0.5) * 0.6)) * step(0.93, sh9);
	col += vec3(0.90, 0.95, 1.00) * st9 * (0.46 + 0.28 * sin((time * 0.69) * 2.18 + sh9 * 40.0));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.033, 1.012, 0.939);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
