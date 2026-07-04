uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.71;
    v = 0.5 * (sin(1.0 * cp.x + t * 1.10) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 1.23) * sin(1.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.06 + sin(p.y * 5.93 + t * 1.53) * 2.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * 3.55 + time * 0.57) * q1;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.46; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.53);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 0.81 + time * 0.29);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.06 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
