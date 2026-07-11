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
	p *= 1.57;
	float acc = 0.0;
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = time * 0.61 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.96;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.58) * 22.45) * (1.0 - age) * exp(-dist * 0.85);
	}
	vec3 col = palette(acc * 1.32 + time * 0.32, vec3(0.50, 0.60, 0.40), vec3(0.31, 0.43, 0.36), vec3(1.08, 0.95, 1.27), vec3(0.68, 0.43, 0.62));
	col = fract(col * 1.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
