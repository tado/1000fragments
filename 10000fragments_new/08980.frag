uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.032, 0.060, 0.040);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.34 + 0.28 * vec2(sin(time * 2.76 + hc.x * 6.2831853), cos(time * 2.13 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.14, 0.09);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.69 + time * 0.40)) * (0.015 / (gd + 0.029));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.15 * sin(gl_FragCoord.y * 2.80 + time * 9.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
