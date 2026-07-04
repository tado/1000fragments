uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 7.56; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.05 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.98;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.65, lr * 2.16 + time * 0.96); }
	{ float fr = length(p); p *= 1.0 + -0.46 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.03));
	col = 0.5 + 0.5 * col;
	col *= 0.80 + 0.11 * sin(gl_FragCoord.y * 1.70 + time * 10.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
