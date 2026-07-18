uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.61;
	vec3 col = vec3(0.008, 0.030, 0.075);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.31 + 0.26 * vec2(sin((time * 0.89) * 2.31 + hc.x * 6.2831853), cos((time * 0.89) * 2.50 + hc.y * 6.2831853));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(2.178, 4.052, 5.926) + fi * 1.10 + (time * 0.89) * 1.17)) * (0.026 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 1.37 + (time * 0.89) * 15.02);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.002, 0.956, 1.024);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
