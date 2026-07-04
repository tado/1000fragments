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
	p *= 1.22;
	float acc = 0.0;
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = time * 0.78 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.01;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.95) * 10.56) * (1.0 - age) * exp(-dist * 1.26);
	}
	vec3 col = palette(acc * 1.24 + time * 0.23, vec3(0.48, 0.43, 0.50), vec3(0.32, 0.46, 0.37), vec3(0.79, 1.20, 0.85), vec3(0.44, 0.52, 0.70));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
