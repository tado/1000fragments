uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.64;
	vec3 col = vec3(0.025, 0.055, 0.069);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.26 + 0.30 * vec2(sin((time * 0.74) * 1.50 + hc.x * 6.2831853), cos((time * 0.74) * 0.84 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.15);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.46, 0.92) + fi * 1.24 + (time * 0.74) * 0.71)) * (0.027 / (gd + 0.050));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.981, 1.058) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
