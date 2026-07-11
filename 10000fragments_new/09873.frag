uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.40 + t * 0.51 + ph) + sin(p.y * 13.94 - t * 0.51 + ph)
        + sin((p.x + p.y) * 7.02 + t * 0.51 + ph) + sin(length(p) * 11.84 - t * 0.51 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.72 + t * 2.31 + ph) + sin(p.y * 4.79 - t * 2.31 + ph)
        + sin((p.x + p.y) * 7.67 + t * 2.31 + ph) + sin(length(p) * 10.85 - t * 2.31 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(0.98) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.19);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.34, 0.41), vec3(0.61, 0.70, 0.76), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
