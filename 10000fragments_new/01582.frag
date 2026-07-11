uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.37;
	p = rot2(time * 1.58) * p;
	vec3 col = vec3(0.016, 0.022, 0.062);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.26 + 0.20 * vec2(sin(time * 0.93 + hc.x * 6.2831853), cos(time * 2.21 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.29);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.68 + time * 1.00)) * (0.016 / (gd + 0.021));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
