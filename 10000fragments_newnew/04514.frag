uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	float acc = 0.0;
	for(int ri = 0; ri < 9; ri++){
		float fi = float(ri);
		float cyc = time * 0.75 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.24;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.71) * 10.45) * (1.0 - age) * exp(-dist * 0.96);
	}
	vec3 col = vec3(0.77, 0.58, 0.63) * (0.06 / (abs(acc) + 0.03));
	col = col / (1.0 + col);
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 0.86 + time * 9.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
