uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	vec3 col = vec3(0.033, 0.027, 0.026);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.30 + 0.33 * vec2(sin(time * 1.09 + hc.x * 6.2831853), cos(time * 2.98 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.05, 0.22);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.94 + time * 1.28)) * (0.011 / (gd + 0.050));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.17 * sin(gl_FragCoord.y * 1.08 + time * 7.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
