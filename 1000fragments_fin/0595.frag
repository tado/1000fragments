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
	p.y += sin(p.x * 2.14 + (time * 0.78) * 0.54) * 0.12;
	p = p.yx;
	vec2 q = p * 2.09 + vec2(18.37, 18.62);
	float nt = (time * 0.78) * 0.21;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 3; ni++){ n1 += na * vnoise2(nq + nt * 0.86); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float den = n1 * 1.05;
	vec3 col = mix(vec3(0.034, 0.037, 0.101), vec3(0.096, 0.432, 0.475), smoothstep(0.19, 0.78, den));
	col = mix(col, vec3(0.995, 0.819, 0.466), smoothstep(0.62, 0.96, den));
	col += vec3(0.530, 0.875, 0.926) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.43;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.014, 0.987, 0.956);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
