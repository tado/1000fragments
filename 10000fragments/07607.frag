uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	vec3 col = vec3(0.033, 0.028, 0.022);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.26 + 0.24 * vec2(sin(time * 1.64 + hc.x * 6.2831853), cos(time * 1.43 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.09, 0.11);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.42 + time * 0.75)) * (0.018 / (gd + 0.020));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
