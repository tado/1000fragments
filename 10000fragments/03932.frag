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
	float acc = 0.0;
	for(int ri = 0; ri < 9; ri++){
		float fi = float(ri);
		float cyc = time * 0.65 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.47;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.95) * 12.45) * (1.0 - age) * exp(-dist * 0.75);
	}
	vec3 col = palette(acc * 1.28 + time * 0.00, vec3(0.42, 0.49, 0.57), vec3(0.37, 0.33, 0.33), vec3(1.40, 1.04, 1.20), vec3(0.15, 0.70, 0.63));
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
