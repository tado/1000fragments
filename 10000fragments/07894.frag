uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.42;
	vec3 col = vec3(0.019, 0.055, 0.046);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.99 + 0.33 * vec2(sin(time * 1.45 + hc.x * 6.2831853), cos(time * 2.14 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.15);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.41 + time * 0.53)) * (0.014 / (gd + 0.014));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
