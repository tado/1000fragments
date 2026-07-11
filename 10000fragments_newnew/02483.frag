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
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = time * 0.70 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.91;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.45) * 10.28) * (1.0 - age) * exp(-dist * 0.87);
	}
	vec3 col = palette(acc * 0.60 + time * 0.29, vec3(0.51, 0.42, 0.46), vec3(0.43, 0.49, 0.34), vec3(0.83, 1.39, 0.70), vec3(0.95, 0.52, 0.49));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.13 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
