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
	p *= 0.97;
	float acc = 0.0;
	for(int ri = 0; ri < 6; ri++){
		float fi = float(ri);
		float cyc = time * 0.87 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.71;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.45) * 13.59) * (1.0 - age) * exp(-dist * 1.47);
	}
	vec3 col = palette(acc * 0.90 + time * 0.29, vec3(0.57, 0.57, 0.43), vec3(0.50, 0.44, 0.34), vec3(1.28, 0.83, 1.32), vec3(0.74, 0.51, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
