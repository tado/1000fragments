uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	p *= 2.03;
	vec3 col = mix(vec3(0.028, 0.051, 0.088), vec3(0.039, 0.059, 0.048), clamp(0.5 + p.y * 0.51 + p.x * -0.09, 0.0, 1.0));
	for(int ri = 0; ri < 9; ri++){
		float fi = float(ri);
		float cyc = (time * 0.70) * 0.86 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.56;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.10) * 15.88) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(5.262, 7.189, 9.117) + fi * 1.47 + (time * 0.70) * 0.76)) * ring * 0.79;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.990, 0.997, 1.002);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
