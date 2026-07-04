uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.22;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.59) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 0.76) * sin(3.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.45 + sr * 18.33 - t * 3.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(time * -0.52) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.19);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.88 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
