uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.43;
	p *= 0.86;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	float acc = 0.0;
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = (time * 0.88) * 0.81 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.21;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.90) * 21.85) * (1.0 - age) * exp(-dist * 1.35);
	}
	float cc = clamp(0.5 + 0.5 * (acc), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.049, 0.070, 0.071), vec3(0.702, 0.276, 0.162), smoothstep(0.0, 0.56, cc)), vec3(0.981, 0.826, 0.648), smoothstep(0.56, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.08));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.010, 1.013, 0.991);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
