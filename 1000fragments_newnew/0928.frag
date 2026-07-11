uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.022, 0.015, 0.034);
	for(int ri = 0; ri < 6; ri++){
		float fi = float(ri);
		float cyc = (time * 0.67) * 0.65 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.63;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.43) * 13.81) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.65, 1.31) + fi * 1.08 + (time * 0.67) * 0.50)) * ring * 0.48;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 1.012, 1.000) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
