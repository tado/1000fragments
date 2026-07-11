uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.49) * p;
	vec3 col = vec3(0.026, 0.002, 0.009);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.86 + 0.16 * vec2(sin(time * 2.34 + hc.x * 6.2831853), cos(time * 0.94 + hc.y * 6.2831853));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.91 + time * 1.33)) * (0.018 / (gd + 0.038));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.19 * sin(gl_FragCoord.y * 2.21 + time * 4.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
