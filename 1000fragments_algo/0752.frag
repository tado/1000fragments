uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.76 + (time * 0.61) * 1.39) * 0.18;
	vec3 col = vec3(0.046, 0.008, 0.055);
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = (time * 0.61) * 0.40 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.99;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.53) * 9.12) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.02) + fi * 0.36 + (time * 0.61) * 0.43)) * ring * 0.49;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(0.915, 0.982, 1.032) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
