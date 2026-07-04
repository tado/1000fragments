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
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = time * 0.82 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.75;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.70) * 8.21) * (1.0 - age) * exp(-dist * 1.38);
	}
	float cc = clamp(0.5 + 0.5 * acc, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.01, 0.15), vec3(0.98, 0.80, 0.70), cc);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
