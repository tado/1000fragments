uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.63;
	vec3 col = vec3(0.048, 0.040, 0.021);
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = (time * 0.50) * 0.25 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.30;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.29) * 14.40) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.61, 1.21) + fi * 0.83 + (time * 0.50) * 0.40)) * ring * 0.58;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.008, 0.950, 1.001) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
