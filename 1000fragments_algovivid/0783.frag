uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.20;
	p.x *= resolution.x / resolution.y;
	p *= 1.01;
	vec3 col = vec3(0.025, 0.025, 0.034);
	for(int ri = 0; ri < 8; ri++){
		float fi = float(ri);
		float cyc = (time * 0.74) * 0.39 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.90;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.34) * 15.43) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.52, 3.04) + fi * 0.93 + (time * 0.74) * 0.79)) * ring * 0.45;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(1.040, 0.971, 0.923) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
