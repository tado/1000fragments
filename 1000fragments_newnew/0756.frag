uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	vec3 col = vec3(0.032, 0.014, 0.055);
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = (time * 0.80) * 0.83 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.40;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.66) * 14.81) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.08, 2.15) + fi * 0.38 + (time * 0.80) * 0.34)) * ring * 0.56;
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 1.77 + (time * 0.80) * 14.65);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.949, 0.997, 1.056) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
