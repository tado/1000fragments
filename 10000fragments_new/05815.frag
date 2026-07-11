uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.10;
	vec3 col = vec3(0.017, 0.058, 0.068);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.99 + 0.29 * vec2(sin(time * 1.78 + hc.x * 6.2831853), cos(time * 2.26 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.17);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.98 + time * 1.44)) * (0.013 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	col = mod(col * 1.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
