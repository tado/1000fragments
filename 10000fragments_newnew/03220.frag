uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.78;
	vec3 col = vec3(0.055, 0.047, 0.065);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.19 + 0.20 * vec2(sin(time * 2.52 + hc.x * 6.2831853), cos(time * 1.57 + hc.y * 6.2831853));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.81 + time * 0.23)) * (0.034 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.14 * sin(gl_FragCoord.y * 1.02 + time * 7.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
