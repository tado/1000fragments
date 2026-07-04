uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.017, 0.028, 0.014);
	for(int ri = 0; ri < 11; ri++){
		float fi = float(ri);
		float cyc = time * 0.57 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 1.60;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.46) * 8.42) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.50 + time * 0.18)) * ring * 0.90;
	}
	col = col / (1.0 + col);
	col = fract(col * 2.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
