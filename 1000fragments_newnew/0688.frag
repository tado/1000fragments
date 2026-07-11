uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.15;
	vec3 col = vec3(0.060, 0.054, 0.027);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.79 + 0.26 * vec2(sin((time * 0.62) * 1.66 + hc.x * 6.2831853), cos((time * 0.62) * 1.23 + hc.y * 6.2831853));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.01, 2.03) + fi * 1.52 + (time * 0.62) * 0.75)) * (0.034 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(1.014, 0.978, 0.999) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
