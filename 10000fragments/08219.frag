uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float acc = 0.0;
	for(int ri = 0; ri < 9; ri++){
		float fi = float(ri);
		float cyc = time * 0.72 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.61;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.71) * 8.34) * (1.0 - age) * exp(-dist * 0.63);
	}
	vec3 col = vec3(0.5 + 0.5 * acc) * vec3(1.49, 0.93, 1.47) + vec3(0.04, 0.20, 0.02);
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
