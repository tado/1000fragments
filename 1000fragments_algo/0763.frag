uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p *= 1.62;
	float acc = 0.0;
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = (time * 0.71) * 0.33 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.81;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.83) * 11.98) * (1.0 - age) * exp(-dist * 1.44);
	}
	float cc = clamp(0.5 + 0.5 * (acc), 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.12, 0.21), vec3(0.65, 0.70, 0.52), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 0.980, 1.011) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
