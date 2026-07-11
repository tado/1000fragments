uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	float acc = 0.0;
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = time * 0.44 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.64;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.77) * 14.01) * (1.0 - age) * exp(-dist * 0.89);
	}
	vec3 col = vec3(0.27, 0.42, 0.64) * (0.19 / (abs(acc) + 0.06));
	col = col / (1.0 + col);
	col *= 0.82 + 0.15 * sin(gl_FragCoord.y * 2.74 + time * 9.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
