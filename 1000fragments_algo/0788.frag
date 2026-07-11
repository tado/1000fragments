uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.48;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.046, 0.020, 0.021);
	for(int ri = 0; ri < 14; ri++){
		float fi = float(ri);
		float cyc = (time * 0.75) * 0.25 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.67;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 0.90) * 12.21) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.71, 1.42) + fi * 0.55 + (time * 0.75) * 0.76)) * ring * 0.84;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.951, 0.998, 0.959) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
