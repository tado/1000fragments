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
	for(int ri = 0; ri < 12; ri++){
		float fi = float(ri);
		float cyc = time * 0.58 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.71;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.94) * 16.89) * (1.0 - age) * exp(-dist * 1.19);
	}
	vec3 col = vec3(0.93, 0.31, 0.76) * (0.13 / (abs(acc) + 0.08));
	col = col / (1.0 + col);
	col *= 0.81 + 0.13 * sin(gl_FragCoord.y * 1.40 + time * 5.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
