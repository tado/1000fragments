uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.46 + jf * 4.0), cos(t * 0.44 * jf)) * 0.64;
        xs += sin(length(p - im) * 213.24 - t * 7.86 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.27 * cos(sa * 7.0 + t * 1.62 + ph);
    v = sin((sr - petal) * 15.55);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.86);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.24 + time * 0.18, vec3(0.46, 0.57, 0.56), vec3(0.42, 0.36, 0.43), vec3(1.24, 1.02, 0.97), vec3(0.54, 0.17, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
