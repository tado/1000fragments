uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 1.14;
	float acc = 0.0;
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = (time * 0.89) * 0.70 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.85;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.84) * 19.26) * (1.0 - age) * exp(-dist * 0.88);
	}
	float cc = clamp(0.5 + 0.5 * (acc), 0.0, 1.0);
	vec3 col = mix(vec3(0.042, 0.101, 0.093), vec3(0.847, 0.910, 0.636), smoothstep(0.0, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.002, 0.965, 1.021);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
