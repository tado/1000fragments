uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.31 + t * 0.63) - 0.5) * 2.0;
    v = sin((p.y * 4.66 + zx * 1.62 + t * 1.79) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.66;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.56) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 0.77) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -2.03 + time * 0.21) * q1;
	q1.x += sin(q1.y * 5.89 + time * 2.62) * 0.18;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.39);
	float d = max(d1, d2);
	vec3 col = vec3(0.75, 0.32, 0.17) * (0.17 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
