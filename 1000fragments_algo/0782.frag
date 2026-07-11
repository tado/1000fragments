uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.23;
	p.y += sin(p.x * 1.10 + (time * 0.64) * 1.21) * 0.10;
	p *= 2.31;
	float acc = 0.0;
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = (time * 0.64) * 0.37 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.81;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.01) * 21.54) * (1.0 - age) * exp(-dist * 1.29);
	}
	vec3 col = vec3(0.5 + 0.5 * (acc)) * vec3(0.57, 0.58, 0.68) + vec3(0.04, 0.02, 0.01);
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 0.996, 0.946) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
