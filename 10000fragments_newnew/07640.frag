uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.45;
	float acc = 0.0;
	for(int ri = 0; ri < 12; ri++){
		float fi = float(ri);
		float cyc = time * 0.52 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.75;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.88) * 8.67) * (1.0 - age) * exp(-dist * 1.46);
	}
	vec3 col = palette(acc * 1.03 + time * 0.37, vec3(0.43, 0.51, 0.57), vec3(0.49, 0.45, 0.36), vec3(1.39, 0.93, 1.34), vec3(0.43, 0.21, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
