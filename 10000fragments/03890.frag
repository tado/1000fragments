uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	float acc = 0.0;
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = time * 0.47 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.70;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.60) * 15.34) * (1.0 - age) * exp(-dist * 1.10);
	}
	float cc = clamp(0.5 + 0.5 * acc, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.38, 0.28), vec3(0.77, 0.81, 0.95), cc);
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
