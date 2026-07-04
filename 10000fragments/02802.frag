uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	float acc = 0.0;
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = time * 0.42 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.63;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.13) * 17.75) * (1.0 - age) * exp(-dist * 1.30);
	}
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + acc * 3.76 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
