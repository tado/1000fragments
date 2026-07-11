uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.20 * cos(sa * 6.0 + t * 3.00 + ph);
    v = sin((sr - petal) * 10.75);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.66;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.73)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 22.39 - t * 3.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	p = rot2(time * -1.59) * p;
	p = fract(p * 2.62) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.67 * fr * fr; }
	p = rot2(p.y * -2.88 + time * 0.59) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.24);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.11 + time * 0.07, vec3(0.53, 0.43, 0.59), vec3(0.40, 0.39, 0.35), vec3(1.04, 1.07, 1.35), vec3(0.94, 0.76, 0.93));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.91 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
