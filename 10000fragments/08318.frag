uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.37;
	float acc = 0.0;
	for(int ri = 0; ri < 9; ri++){
		float fi = float(ri);
		float cyc = time * 0.70 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.92;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.89) * 14.05) * (1.0 - age) * exp(-dist * 1.19);
	}
	vec3 col = vec3(0.5 + 0.5 * acc) * vec3(1.34, 0.60, 0.84) + vec3(0.15, 0.02, 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
