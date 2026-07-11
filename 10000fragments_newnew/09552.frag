uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.89;
	vec2 vp = p * 4.27;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(time * 1.13 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.11, m2 - m1);
	vec3 col = palette(hash21(mid) * 1.97 + time * 0.25, vec3(0.50, 0.49, 0.41), vec3(0.36, 0.34, 0.45), vec3(1.27, 0.86, 1.19), vec3(0.35, 0.59, 0.10)) * (0.64 + 0.36 * sin(time * 4.30 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 2.78 + time * 10.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
