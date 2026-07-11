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
    vec2 zp = p * 4.38;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.13)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 10.33 - t * 2.31 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 3.43 + ph), vnoise2(p * 3.43 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.43 + 3.01 * wq + vec2(1.7, 9.2) + t * 0.33),
                   vnoise2(p * 3.43 + 3.93 * wq + vec2(8.3, 2.8) - t * 0.76));
    v = vnoise2(p * 3.43 + 1.02 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.78;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.67);
	float d = d1 * d2;
	vec3 col = vec3(0.60, 0.30, 0.29) * (0.07 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col *= 0.90 + 0.14 * sin(gl_FragCoord.y * 2.28 + time * 13.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
