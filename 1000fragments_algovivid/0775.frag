uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.36;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	vec3 col = vec3(0.005, 0.007, 0.006);
	for(int ri = 0; ri < 12; ri++){
		float fi = float(ri);
		float cyc = (time * 0.78) * 0.61 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.85;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.44) * 8.90) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.65, 3.30) + fi * 1.46 + (time * 0.78) * 0.10)) * ring * 0.57;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 0.995, 0.928) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
