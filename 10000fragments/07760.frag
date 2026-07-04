uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.86; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.12 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.53;
	p = (floor(p * 12.8) + 0.5) / 12.8;
	p += vec2(0.78, 0.26) * sin(length(p) * 3.67 - time * 0.94) * 0.15;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.76; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.02, 0.24, 0.43), vec3(0.97, 0.50, 0.57), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
