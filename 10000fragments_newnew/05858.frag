uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.54;
	vec3 col = vec3(0.032, 0.036, 0.058);
	for(int ri = 0; ri < 12; ri++){
		float fi = float(ri);
		float cyc = time * 0.52 + hash21(vec2(fi, 1.7));
		float age = fract(cyc);
		vec2 dp = (hash22(vec2(fi, floor(cyc))) - 0.5) * 2.61;
		float dist = length(p - dp);
		float ring = exp(-abs(dist - age * 1.33) * 18.71) * (1.0 - age);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.73 + time * 0.26)) * ring * 0.87;
	}
	col = col / (1.0 + col);
	col *= 0.86 + 0.14 * sin(gl_FragCoord.y * 1.15 + time * 4.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
