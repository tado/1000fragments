uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.43 + 0.30 * pow(abs(cos(ra * 3.0 + t * 2.11)), 1.14);
    v = sin((rr - pet) * 18.38 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.60;
    v = 0.5 * (sin(3.0 * cp.x + t * 2.30) * sin(4.0 * cp.y + ph)
             + sin(4.0 * cp.x - t * 1.20) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.78);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.62));
	vec3 col = palette(d * 0.80 + time * 0.12, vec3(0.47, 0.55, 0.53), vec3(0.49, 0.37, 0.34), vec3(0.80, 0.81, 0.82), vec3(0.60, 0.87, 0.66));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
