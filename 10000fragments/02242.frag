uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.023, 0.034, 0.075);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.01 + 0.21 * vec2(sin(time * 2.85 + hc.x * 6.2831853), cos(time * 2.06 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.21);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.50 + time * 0.88)) * (0.031 / (gd + 0.045));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
