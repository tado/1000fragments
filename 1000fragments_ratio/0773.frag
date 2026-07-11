uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	p *= 2.37;
	vec3 col = vec3(0.045, 0.040, 0.022);
	for(int ri = 0; ri < 7; ri++){
		float fi = float(ri);
		float cyc = (time * 0.83) * 0.50 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.19;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.03) * 15.54) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.46, 2.91) + fi * 1.24 + (time * 0.83) * 0.22)) * ring * 0.77;
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.83)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(0.987, 1.004, 0.986) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
