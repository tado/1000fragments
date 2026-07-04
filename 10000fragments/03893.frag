uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.69 + ga * 4.0 - t * 2.73 + ph);
    v = arm * exp(-gr * 0.88);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.47 + ph), vnoise2(p * 3.47 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.47 + 1.91 * wq + vec2(1.7, 9.2) + t * 0.58),
                   vnoise2(p * 3.47 + 3.24 * wq + vec2(8.3, 2.8) - t * 0.90));
    v = vnoise2(p * 3.47 + 3.63 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.38 * sin(mf + 3.0) + ph), cos(t * 1.99 * cos(mf + 3.0) + ph));
        ms += 0.022 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 *= 1.0 + 0.13 * sin(time * 3.37);
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 1.04;
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 2.07));
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.52);
	float d3 = fieldC(q3, time, 1.20);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.20, 0.95, 0.71) * (0.21 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 2.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
