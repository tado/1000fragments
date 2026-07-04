uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.85 + t * 0.69) - 0.5) * 2.0;
    v = sin((p.y * 2.26 + zx * 0.69 + t * 1.46) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.29;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.08)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 14.67 - t * 7.05 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.84 + ga * 2.0 - t * 2.66 + ph);
    v = arm * exp(-gr * 1.15);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.13;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q3 = sin(q3 * 2.51 + time * 1.92) * 1.31;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.43);
	float d3 = fieldC(q3, time, 1.93);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = hue(d * 1.22 + time * 0.36);
	col = fract(col * 2.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
