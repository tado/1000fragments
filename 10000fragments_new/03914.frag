uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.16 * cos(sa * 3.0 + t * 1.96 + ph);
    v = sin((sr - petal) * 19.05);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.65 + sin(p.y * 4.98 + t * 4.32) * 2.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.30; q2 = rot2(0.91) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.00);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.66, 0.34, 0.95) * (0.23 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 2.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
