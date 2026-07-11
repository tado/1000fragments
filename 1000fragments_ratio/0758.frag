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
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	p *= 1.71;
	vec3 col = vec3(0.038, 0.036, 0.062);
	for(int ri = 0; ri < 13; ri++){
		float fi = float(ri);
		float cyc = (time * 0.58) * 0.69 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.99;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.09) * 16.88) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.20, 2.40) + fi * 1.25 + (time * 0.58) * 0.45)) * ring * 0.59;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.991, 0.980, 0.980) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
