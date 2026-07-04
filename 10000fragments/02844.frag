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
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.82;
	vec2 vp = p * 3.20;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(time * 0.95 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.12, m2 - m1);
	vec3 col = palette(hash21(mid) * 1.18 + time * 0.12, vec3(0.58, 0.46, 0.43), vec3(0.43, 0.34, 0.36), vec3(0.71, 0.89, 1.37), vec3(0.94, 0.88, 0.33)) * (0.61 + 0.21 * sin(time * 1.15 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
