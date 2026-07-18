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
	p *= 1.27;
	p.x += p.y * -0.64;
	vec3 col = mix(vec3(0.008, 0.071, 0.077), vec3(0.027, 0.084, 0.097), clamp(0.5 + p.y * 0.36 + p.x * -0.19, 0.0, 1.0));
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = (time * 0.61) * 0.51 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.72;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.58) * 6.24) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(4.993, 5.828, 6.662) + fi * 1.31 + (time * 0.61) * 0.72)) * ring * 0.54;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.77 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.029, 1.013, 0.917);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
