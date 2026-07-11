uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	float acc = 0.0;
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = (time * 0.64) * 0.49 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.67;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.37) * 14.70) * (1.0 - age) * exp(-dist * 1.37);
	}
	float cc = clamp(0.5 + 0.5 * (acc), 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.08, 0.11), vec3(0.61, 0.63, 0.76), cc);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(0.947, 0.971, 1.035) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
