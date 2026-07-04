uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	float acc = 0.0;
	for(int ri = 0; ri < 12; ri++){
		float fi = float(ri);
		float cyc = time * 0.50 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.83;
		float dist = length(p - dp);
		acc += sin((dist - age * 0.94) * 22.67) * (1.0 - age) * exp(-dist * 0.57);
	}
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + acc * 3.78 + time * 0.75);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
