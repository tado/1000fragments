uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x = abs(p.x);
	float acc = 0.0;
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = (time * 0.59) * 0.39 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.10;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.23) * 22.08) * (1.0 - age) * exp(-dist * 1.07);
	}
	vec3 col = vec3(0.5 + 0.5 * (acc)) * vec3(0.58, 0.61, 0.51) + vec3(0.02, 0.00, 0.01);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.018, 0.993, 0.939);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
