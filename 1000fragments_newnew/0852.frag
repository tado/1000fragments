uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	float acc = 0.0;
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = (time * 0.84) * 0.65 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.25;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.61) * 16.83) * (1.0 - age) * exp(-dist * 1.49);
	}
	float cc = clamp(0.5 + 0.5 * (acc), 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.05, 0.05), vec3(0.62, 0.69, 0.53), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(0.917, 0.971, 1.029) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
