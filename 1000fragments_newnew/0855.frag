uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	vec3 col = vec3(0.034, 0.000, 0.044);
	for(int ri = 0; ri < 9; ri++){
		float fi = float(ri);
		float cyc = (time * 0.77) * 0.52 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.35;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 0.91) * 19.11) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.45, 0.91) + fi * 1.46 + (time * 0.77) * 0.52)) * ring * 0.86;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.991, 0.944, 0.992) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
