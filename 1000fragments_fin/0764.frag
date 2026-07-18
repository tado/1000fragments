uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.y = abs(p.y);
	p *= 1.11;
	vec3 col = mix(vec3(0.016, 0.024, 0.042), vec3(0.022, 0.042, 0.078), clamp(0.5 + p.y * -0.02 + p.x * 0.25, 0.0, 1.0));
	for(int ri = 0; ri < 10; ri++){
		float fi = float(ri);
		float cyc = (time * 0.86) * 0.52 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.34;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 0.96) * 8.15) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(4.352, 5.942, 7.532) + fi * 0.39 + (time * 0.86) * 0.32)) * ring * 0.88;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.021, 0.962, 1.007);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
