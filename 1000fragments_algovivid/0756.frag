uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.03 + (time * 0.58) * 1.21) * 0.15;
	p *= 2.58;
	vec3 col = vec3(0.018, 0.030, 0.050);
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = (time * 0.58) * 0.50 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.10;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.05) * 19.07) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.18, 2.37) + fi * 1.19 + (time * 0.58) * 0.16)) * ring * 0.69;
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.34);
	col = clamp(col, 0.0, 1.0) * vec3(1.021, 0.940, 0.995) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
