uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.00 + sr * 9.97 - t * 2.35 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.32 + t * 1.00 + ph) + sin(p.y * 3.33 - t * 1.00 + ph)
        + sin((p.x + p.y) * 6.94 + t * 1.00 + ph) + sin(length(p) * 8.59 - t * 1.00 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.54);
	float d = d1 * d2;
	vec3 col = hue(d * 1.34 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
