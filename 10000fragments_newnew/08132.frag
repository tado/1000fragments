uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.40, t * 2.05 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.59 * jf)) * 0.81;
        xs += sin(length(p - im) * 115.54 - t * 4.66 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	q1 = (floor(q1 * 27.0) + 0.5) / 27.0;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.44; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.25);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.98 + time * 0.13, vec3(0.59, 0.41, 0.53), vec3(0.34, 0.41, 0.37), vec3(1.06, 1.13, 1.13), vec3(0.51, 0.28, 0.20));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
