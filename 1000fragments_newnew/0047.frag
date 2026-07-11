uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float acc = 0.0;
	for(int ri = 0; ri < 14; ri++){
		float fi = float(ri);
		float cyc = (time * 0.51) * 0.45 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.09;
		float dist = length(p - dp);
		acc += sin((dist - age * 1.18) * 21.12) * (1.0 - age) * exp(-dist * 0.83);
	}
	vec3 col = vec3(0.5 + 0.5 * (acc)) * vec3(0.54, 0.39, 0.52) + vec3(0.12, 0.11, 0.09);
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 1.68 + (time * 0.51) * 6.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.919, 0.987, 1.048) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
