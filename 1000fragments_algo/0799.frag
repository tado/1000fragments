uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.37;
	p.x *= resolution.x / resolution.y;
	p *= 2.52;
	vec3 col = vec3(0.003, 0.020, 0.044);
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = (time * 0.78) * 0.51 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.99;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.04) * 9.34) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.57, 1.14) + fi * 0.40 + (time * 0.78) * 0.21)) * ring * 0.69;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.023, 0.972, 1.028) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
