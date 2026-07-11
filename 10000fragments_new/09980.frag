uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.90;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.67; kp = rot2(2.44) * kp; kp *= 1.39; }
    v = sin(kp.x * 3.48 - t * 3.27 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.33 + sr * 14.26 - t * 2.94 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.95 + 0.12 * sin(t * 1.09)) + vec2(-0.33, 0.27) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 32; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 32.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q3); q3 *= 1.0 + -0.69 * fr * fr; }
	q3 = rot2(1.40) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.41);
	float d3 = fieldC(q3, time, 0.96);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = hue(d * 1.25 + time * 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
