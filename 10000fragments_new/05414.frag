uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.37 + 0.17 * pow(abs(cos(ra * 2.0 + t * 2.56)), 0.56);
    v = sin((rr - pet) * 11.93 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.17, t * 0.61 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.07);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.06 + time * 0.00, vec3(0.58, 0.57, 0.54), vec3(0.32, 0.39, 0.38), vec3(1.17, 0.76, 0.74), vec3(0.01, 0.41, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
