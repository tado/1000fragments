uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.18;
	p = rot2(time * -1.08) * p;
	vec3 col = vec3(0.045, 0.029, 0.040);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.67 + 0.16 * vec2(sin(time * 1.66 + hc.x * 6.2831853), cos(time * 2.99 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.12, 0.06);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.53 + time * 0.50)) * (0.034 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 1.40 + time * 6.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
