uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.33 + t * 2.22 + ph) + sin(p.y * 13.16 - t * 1.49 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.92 + t * 0.74 + ph) * 0.7;
    float wb = sin(p.y * 14.79 - t * 0.66 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.34;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(q2.y * 3.90 + time * 0.85) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.22);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.27, 0.21), vec3(0.92, 0.70, 0.82), cc);
	col = fract(col * 1.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
