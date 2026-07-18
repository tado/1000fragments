uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.44;
	p.x += p.y * -0.71;
	p.x *= resolution.x / resolution.y;
	vec2 vp = p * 3.45;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin((time * 0.60) * 2.93 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.13, m2 - m1);
	vec3 col = palette(hash21(mid) * 1.51 + (time * 0.60) * 0.21, vec3(0.60, 0.69, 0.78), vec3(0.26, 0.22, 0.15), vec3(0.96, 1.03, 1.02), vec3(0.46, 0.58, 0.69)) * (0.73 + 0.37 * sin((time * 0.60) * 3.57 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.006, 0.987, 0.988);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
