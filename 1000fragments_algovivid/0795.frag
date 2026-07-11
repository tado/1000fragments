uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p *= 0.93;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	vec3 col = vec3(0.029, 0.045, 0.070);
	for(int ri = 0; ri < 14; ri++){
		float fi = float(ri);
		float cyc = (time * 0.59) * 0.39 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.37;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.21) * 18.96) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.70, 1.41) + fi * 1.47 + (time * 0.59) * 0.79)) * ring * 0.90;
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.15 * sin(gl_FragCoord.y * 0.85 + (time * 0.59) * 10.82);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.993, 0.914) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
