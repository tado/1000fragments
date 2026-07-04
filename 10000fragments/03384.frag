uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.06; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.55 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.99 + sin(p.y * 2.41 + t * 2.36) * 3.93 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	vec2 q1 = p; vec2 q2 = p;
	q2 = sin(q2 * 1.10 + time * 1.75) * 0.61;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 1.43));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.11);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.05 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
