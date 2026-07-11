uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.22 + 0.37 * sin(t * 0.83)) + vec2(-0.87, -0.02) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.87 + ph), vnoise2(p * 3.87 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.87 + 1.77 * wq + vec2(1.7, 9.2) + t * 0.94),
                   vnoise2(p * 3.87 + 1.38 * wq + vec2(8.3, 2.8) - t * 0.96));
    v = vnoise2(p * 3.87 + 2.49 * wr) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.15 + sr * 17.50 - t * 1.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = fract(q1 * 1.67) - 0.5;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.41; q2 = rot2(1.55) * q2; }
	{ float fr = length(q2); q2 *= 1.0 + 0.56 * fr * fr; }
	q3 = (floor(q3 * 28.8) + 0.5) / 28.8;
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.31);
	float d3 = fieldC(q3, time, 0.85);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.18, 0.72, 0.79) * (0.18 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
