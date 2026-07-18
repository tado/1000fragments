uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x += p.y * -0.21;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	float acc = 0.0;
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = (time * 0.86) * 0.28 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.63;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.33) * 11.19) * (1.0 - age) * exp(-dist * 1.13);
	}
	float cc = clamp(0.5 + 0.5 * (acc), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.006, 0.035, 0.142), vec3(0.078, 0.469, 0.495), smoothstep(0.0, 0.48, cc)), vec3(1.000, 0.839, 0.437), smoothstep(0.48, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.007, 0.972, 1.010);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
