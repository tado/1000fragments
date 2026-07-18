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
	vec3 col = mix(vec3(0.016, 0.070, 0.075), vec3(0.023, 0.072, 0.060), clamp(0.5 + p.y * -0.41 + p.x * -0.16, 0.0, 1.0));
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = (time * 0.81) * 0.52 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.94;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 0.88) * 7.01) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(3.225, 5.019, 6.812) + fi * 0.34 + (time * 0.81) * 0.68)) * ring * 0.67;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.947, 0.985, 1.050);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
