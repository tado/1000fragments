uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.y = abs(p.y) - 0.36;
	vec3 col = mix(vec3(0.019, 0.028, 0.053), vec3(0.023, 0.041, 0.053), clamp(0.5 + p.y * -0.61 + p.x * 0.14, 0.0, 1.0));
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = (time * 0.76) * 0.71 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.14;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.51) * 15.13) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(2.260, 3.817, 5.373) + fi * 1.39 + (time * 0.76) * 0.74)) * ring * 0.67;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.34 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.035, 0.997, 0.935);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
