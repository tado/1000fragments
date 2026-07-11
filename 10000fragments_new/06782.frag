uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.98; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.63 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.88), cos(time * 0.65)) * 0.08;
	float an = atan(p.y, p.x) + time * 0.29;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.44 / 3.1415927, 0.81 / r + time * 1.50);
	tv.x += tv.y * 0.48;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.10, vec3(0.58, 0.53, 0.45), vec3(0.48, 0.48, 0.35), vec3(0.81, 0.96, 1.16), vec3(0.81, 0.78, 0.21));
	col *= clamp(r * 2.59, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
