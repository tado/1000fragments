uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.99 + t * 2.87 + ph) + sin(p.y * 5.54 - t * 2.87 + ph)
        + sin((p.x + p.y) * 4.73 + t * 2.87 + ph) + sin(length(p) * 6.91 - t * 2.87 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 13.90 + t * 1.09 + ph) * 0.7;
    float wb = sin(p.y * 14.24 - t * 1.51 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.74;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -1.65 + time * 0.58) * q1;
	q1 = rot2(length(q1) * 1.78 + time * 1.50) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.08);
	float d = min(d1, d2);
	vec3 col = hue(d * 1.27 + time * 0.37);
	col *= 0.85 + 0.15 * sin(gl_FragCoord.y * 2.61 + time * 12.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
