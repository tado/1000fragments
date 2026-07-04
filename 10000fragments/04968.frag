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
	p *= 2.08;
	float acc = 0.0;
	for(int ri = 0; ri < 14; ri++){
		float fi = float(ri);
		float cyc = time * 0.30 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.28;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.03) * 13.20) * (1.0 - age) * exp(-dist * 1.33);
	}
	vec3 col = palette(acc * 0.75 + time * 0.15, vec3(0.51, 0.53, 0.46), vec3(0.35, 0.46, 0.42), vec3(0.70, 0.98, 1.29), vec3(0.10, 0.81, 0.82));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.27 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
