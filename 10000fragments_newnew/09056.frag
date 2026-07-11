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
	p *= 2.36;
	float acc = 0.0;
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = time * 0.84 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.56;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.99) * 10.37) * (1.0 - age) * exp(-dist * 0.91);
	}
	vec3 col = palette(acc * 0.98 + time * 0.32, vec3(0.50, 0.48, 0.41), vec3(0.37, 0.32, 0.48), vec3(1.31, 1.28, 1.32), vec3(0.81, 0.39, 0.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
