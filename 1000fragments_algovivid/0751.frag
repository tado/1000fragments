uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.60) * 0.63), cos((time * 0.60) * 0.91)) * 0.21;
	p *= 2.40;
	vec3 col = vec3(0.021, 0.026, 0.043);
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = (time * 0.60) * 0.60 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.82;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.79) * 15.15) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.31, 2.62) + fi * 1.11 + (time * 0.60) * 0.25)) * ring * 0.86;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.916, 0.988, 1.045) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
