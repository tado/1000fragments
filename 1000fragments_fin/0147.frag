uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 7.19; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.26 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = mix(p, p.yx, 0.5 + 0.5 * sin((time * 0.90) * 1.03));
	p = rot2(3.06) * p;
	p.y += sin(p.x * 6.14 + (time * 0.90) * 3.17) * 0.26;
	float d = clamp(0.5 + 0.5 * field(p, (time * 0.90), 0.0), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.017, 0.006, 0.038), vec3(0.242, 0.319, 0.765), smoothstep(0.0, 0.48, d)), vec3(0.641, 0.927, 0.983), smoothstep(0.48, 1.0, d));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.11));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.016, 0.961, 1.012);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
