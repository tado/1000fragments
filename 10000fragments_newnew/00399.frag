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
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = time * 0.85 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.72;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.98) * 23.88) * (1.0 - age) * exp(-dist * 0.51);
	}
	vec3 col = vec3(0.5 + 0.5 * acc) * vec3(1.18, 0.86, 0.52) + vec3(0.02, 0.09, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
