uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	float acc = 0.0;
	for(int ri = 0; ri < 6; ri++){
		float fi = float(ri);
		float cyc = time * 0.70 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.53;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.27) * 19.75) * (1.0 - age) * exp(-dist * 0.95);
	}
	vec3 col = vec3(0.58, 0.61, 0.98) * (0.18 / (abs(acc) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 2.68, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
