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
    vec2 vp = p * 7.48; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.30 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.21;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.66 / 3.1415927, 1.42 / r - time * 2.64);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.02, vec3(0.57, 0.56, 0.46), vec3(0.37, 0.33, 0.40), vec3(0.77, 0.77, 0.75), vec3(0.38, 0.72, 0.93));
	col *= clamp(r * 1.30, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
