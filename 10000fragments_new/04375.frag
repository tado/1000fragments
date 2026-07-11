uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.20 + sin(p.y * 4.66 + t * 4.14) * 3.60 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.60, t * 1.70 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.40);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.86));
	vec3 col = palette(d * 0.96 + time * 0.26, vec3(0.51, 0.59, 0.53), vec3(0.33, 0.41, 0.46), vec3(1.07, 0.70, 0.80), vec3(0.18, 0.02, 0.14));
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 0.89 + time * 4.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
