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
    vec2 tp = p * 5.35; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 10.49 - t * 1.36 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 7.22; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.65 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.66, -0.08) * sin(length(p) * 5.20 - time * 2.29) * 0.29;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.77);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.77 + time * 0.14, vec3(0.58, 0.59, 0.55), vec3(0.50, 0.48, 0.44), vec3(1.12, 1.24, 1.33), vec3(0.79, 0.76, 0.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
