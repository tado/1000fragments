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
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float acc = 0.0;
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = time * 0.31 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.39;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.87) * 21.10) * (1.0 - age) * exp(-dist * 0.61);
	}
	vec3 col = palette(acc * 1.46 + time * 0.17, vec3(0.59, 0.52, 0.54), vec3(0.34, 0.48, 0.50), vec3(0.87, 0.84, 1.03), vec3(0.12, 0.71, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
