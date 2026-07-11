uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.87;
    v = 0.5 * (sin(6.0 * cp.x + t * 0.77) * sin(3.0 * cp.y + ph)
             + sin(3.0 * cp.x - t * 0.79) * sin(6.0 * cp.y + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 32.78 - t * 7.65 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 19.62 - t * 5.34 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	p *= 1.36;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, (time * 0.63), 0.0);
	float d2 = fieldB(q2, (time * 0.63), 1.05);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette((d) * 0.81 + (time * 0.63) * 0.17, vec3(0.32, 0.35, 0.30), vec3(0.26, 0.23, 0.25), vec3(0.58, 0.40, 0.49), vec3(0.82, 0.73, 0.83));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 1.009, 1.000) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
