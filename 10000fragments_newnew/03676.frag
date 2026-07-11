uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float acc = 0.0;
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = time * 0.73 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.81;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.80) * 23.93) * (1.0 - age) * exp(-dist * 0.81);
	}
	vec3 col = vec3(0.5 + 0.5 * acc) * vec3(1.33, 1.35, 0.96) + vec3(0.07, 0.02, 0.13);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.79 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
