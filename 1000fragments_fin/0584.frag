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
	vec2 q = p * 2.29 + vec2(5.33, 8.48);
	float nt = (time * 0.66) * 0.21;
	float n1 = 0.0; float na = 0.5; vec2 nq = q;
	for(int ni = 0; ni < 3; ni++){ n1 += na * vnoise2(nq + nt * 0.45); nq = nq * 2.03 + 17.0; na *= 0.55; }
	float den = n1 * 1.05;
	vec3 col = mix(vec3(0.008, 0.030, 0.144), vec3(0.137, 0.413, 0.773), smoothstep(0.23, 0.80, den));
	col = mix(col, vec3(0.868, 0.962, 1.000), smoothstep(0.60, 0.99, den));
	col += vec3(0.210, 0.253, 0.426) * pow(clamp(den, 0.0, 1.0), 4.0) * 0.67;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.024, 0.946, 0.998);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
