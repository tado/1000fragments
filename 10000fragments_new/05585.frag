uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	vec3 col = vec3(0.052, 0.012, 0.075);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.37 + 0.32 * vec2(sin(time * 2.71 + hc.x * 6.2831853), cos(time * 1.35 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.12);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.67 + time * 1.05)) * (0.038 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
