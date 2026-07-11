uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	vec3 col = vec3(0.033, 0.054, 0.030);
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.17 + 0.30 * vec2(sin(time * 1.13 + hc.x * 6.2831853), cos(time * 1.52 + hc.y * 6.2831853));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.74 + time * 1.27)) * (0.020 / (gd + 0.016));
	}
	col = col / (1.0 + col);
	col *= 0.90 + 0.16 * sin(gl_FragCoord.y * 1.00 + time * 6.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
