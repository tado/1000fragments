uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.15 + t * 3.44 + ph) * 0.7;
    float wb = sin(p.y * 9.48 - t * 2.55 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.77;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.12 - t * 1.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.60;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(1.86) * q2;
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 2.42));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.64);
	float d = 0.5 * (d1 + d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.30 + time * 0.70);
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
