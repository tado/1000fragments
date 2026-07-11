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
    vec2 vp = p * 3.77; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.58 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.77;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.78 / 3.1415927, 0.94 / r + time * 1.52);
	tv.x += tv.y * 0.40;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.48 + time * 0.29, vec3(0.41, 0.42, 0.45), vec3(0.32, 0.32, 0.41), vec3(1.05, 0.89, 0.85), vec3(0.05, 0.18, 0.25));
	col *= clamp(r * 2.55, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
