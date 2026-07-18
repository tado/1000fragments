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
	p += vec2(sin((time * 0.79) * 0.94), cos((time * 0.79) * 0.47)) * 0.24;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	vec2 vp = p * 3.40;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin((time * 0.79) * 2.69 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.12, m2 - m1);
	vec3 col = palette(hash21(mid) * 0.98 + (time * 0.79) * 0.03, vec3(0.47, 0.41, 0.34), vec3(0.33, 0.30, 0.27), vec3(0.97, 1.03, 0.66), vec3(0.01, 0.27, 0.40)) * (0.73 + 0.32 * sin((time * 0.79) * 3.61 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.030, 0.999, 0.937);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.25 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
