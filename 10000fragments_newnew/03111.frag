uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.29 + t * 1.28) - 0.5) * 2.0;
    v = sin((p.y * 6.27 + zx * 0.90 + t * 2.18) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.83 + t * 1.17 + ph) + sin(p.y * 6.41 - t * 1.17 + ph)
        + sin((p.x + p.y) * 2.89 + t * 1.17 + ph) + sin(length(p) * 15.57 - t * 1.17 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.87;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.32);
	float d = d1 * d2;
	vec3 col = hue(d * 0.75 + time * 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
