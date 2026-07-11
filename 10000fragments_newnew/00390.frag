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
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = time * 0.52 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.27;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.99) * 10.84) * (1.0 - age) * exp(-dist * 1.13);
	}
	vec3 col = palette(acc * 0.53 + time * 0.22, vec3(0.50, 0.49, 0.54), vec3(0.42, 0.43, 0.37), vec3(1.19, 0.88, 0.83), vec3(0.52, 0.06, 0.41));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.43 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
