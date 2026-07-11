uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 3.52; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.57 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.84), cos(time * 1.08)) * 0.26;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.34 / 3.1415927, 1.46 / r + time * 1.55);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.56, 0.46, 0.88) * (0.22 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= clamp(r * 2.23, 0.0, 1.0);
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 1.74 + time * 12.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
