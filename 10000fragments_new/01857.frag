uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 29.54 - t * 3.85 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 22.33 - t * 5.89 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.19 + sin(p.y * 2.72 + t * 0.75) * 4.47 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.02;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.94);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.45 + time * 0.36, vec3(0.49, 0.56, 0.52), vec3(0.36, 0.48, 0.42), vec3(1.23, 1.09, 1.12), vec3(0.34, 0.93, 0.71));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
