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
    vec2 vp = p * 8.17; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.01 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 23.72 - t * 3.88 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 25.80 - t * 1.26 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.19));
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.82; }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.90);
	float d = d1 * d2;
	vec3 col = palette(d * 1.55 + time * 0.11, vec3(0.59, 0.54, 0.41), vec3(0.34, 0.45, 0.35), vec3(1.36, 0.99, 0.72), vec3(0.24, 0.62, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
