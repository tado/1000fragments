uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.91 + vec2(t * 2.55, -t * 1.73) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.69;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.85)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 23.87 - t * 4.03 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 5.64 + ga * 4.0 - t * 2.97 + ph);
    v = arm * exp(-gr * 0.87);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 3; fo++){ q2 = abs(q2) - 0.49; q2 = rot2(0.83) * q2; }
	{ q3 = vec2(atan(q3.y, q3.x) * 2.82, length(q3) * 4.37 - time * 0.88); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.21);
	float d3 = fieldC(q3, time, 1.70);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.75 + time * 0.11);
	col *= 0.84 + 0.13 * sin(gl_FragCoord.y * 2.23 + time * 15.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
