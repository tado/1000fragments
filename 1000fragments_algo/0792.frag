uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.39;
	p.y += sin(p.x * 2.43 + (time * 0.66) * 1.38) * 0.13;
	p.x *= resolution.x / resolution.y;
	p *= 1.42;
	vec3 col = vec3(0.011, 0.039, 0.029);
	for(int ri = 0; ri < 14; ri++){
		float fi = float(ri);
		float cyc = (time * 0.66) * 0.42 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.26;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.26) * 7.61) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.92, 1.85) + fi * 1.14 + (time * 0.66) * 0.72)) * ring * 0.45;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.915, 0.972, 1.058) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
