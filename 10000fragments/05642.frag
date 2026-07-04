uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 11.0 + qr * 3.15 * sin(t * 1.09) + t * 1.71 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.21, t * 2.25 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.72;
    float pk = 6.2831853 / 3.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 20.24 - t * 5.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(2.20) * q1;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.45 / wf * sin(wf * 2.74 * q1.y + time * 0.99); q1.y += 0.49 / wf * cos(wf * 2.07 * q1.x + time * 1.32); }
	q2 = rot2(q2.y * -2.63 + time * 1.16) * q2;
	for(int fo = 0; fo < 4; fo++){ q3 = abs(q3) - 0.16; q3 = rot2(1.76) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.99);
	float d3 = fieldC(q3, time, 1.15);
	d2 = abs(d2 - d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.13 + time * 0.11);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.58 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
