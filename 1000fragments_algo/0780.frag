uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.57) * 0.99), cos((time * 0.57) * 1.01)) * 0.16;
	p *= 1.88;
	float acc = 0.0;
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = (time * 0.57) * 0.58 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.83;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.02) * 12.64) * (1.0 - age) * exp(-dist * 0.96);
	}
	vec3 col = vec3(0.68, 0.74, 0.63) * (0.08 / (abs((acc)) + 0.07));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.57)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.958, 1.017, 0.929) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
