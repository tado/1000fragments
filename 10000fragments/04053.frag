uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	float acc = 0.0;
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = time * 0.37 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.12;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.23) * 22.25) * (1.0 - age) * exp(-dist * 1.45);
	}
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + acc * 4.94 + time * 0.11);
	col = mod(col * 1.90, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
