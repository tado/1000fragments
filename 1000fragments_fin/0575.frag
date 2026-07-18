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
	p *= 1.29;
	vec2 q = p * 2.09 + vec2(9.31, 2.88);
	float nt = (time * 0.73) * 0.24;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 4; ni++){ n1 += na * vnoise2(nq + nt * 0.66); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float den = n1 * 1.05;
	den = 1.0 - abs(den * 2.0 - 1.0); den *= den;
	vec3 col = mix(vec3(0.023, 0.095, 0.027), vec3(0.336, 0.479, 0.189), smoothstep(0.22, 0.72, den));
	col = mix(col, vec3(0.980, 0.896, 0.574), smoothstep(0.63, 1.10, den));
	col += vec3(1.000, 0.640, 0.288) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.51;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(1.026, 0.972, 0.953);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
