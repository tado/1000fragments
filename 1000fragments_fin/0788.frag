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
	p.y += sin(p.x * 1.93 + (time * 0.69) * 1.34) * 0.14;
	p.y = abs(p.y);
	p *= 2.49;
	float acc = 0.0;
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = (time * 0.69) * 0.28 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.76;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.29) * 8.69) * (1.0 - age) * exp(-dist * 0.99);
	}
	float cc = clamp(0.5 + 0.5 * (acc), 0.0, 1.0);
	vec3 col = mix(vec3(0.791, 0.714, 0.984), vec3(0.059, 0.038, 0.112), cc);
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 1.23 + (time * 0.69) * 4.41);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.003, 1.001, 0.988);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
