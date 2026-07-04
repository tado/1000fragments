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

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.14; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.89 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.83);
    float gsh = hash21(vec2(grow, floor(t * 5.70))) - 0.5;
    float gx = p.x + gsh * 0.68;
    v = sin(gx * 8.59 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.42));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.22);
	float d = d1 + d2;
	vec3 col = palette(d * 1.09 + time * 0.21, vec3(0.56, 0.54, 0.58), vec3(0.41, 0.43, 0.48), vec3(1.01, 1.04, 1.27), vec3(0.27, 0.70, 0.09));
	col = fract(col * 2.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
