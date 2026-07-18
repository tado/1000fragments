uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	vec3 col = mix(vec3(0.027, 0.069, 0.073), vec3(0.024, 0.098, 0.070), clamp(0.5 + p.y * 0.37 + p.x * -0.20, 0.0, 1.0));
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = (time * 0.80) * 0.88 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.03;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.28) * 8.65) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(3.517, 4.861, 6.205) + fi * 0.66 + (time * 0.80) * 0.31)) * ring * 0.86;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.016, 0.974, 1.005);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
