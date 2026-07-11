uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.94 + sr * 18.99 - t * 4.24 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.15 * cos(sa * 5 + t * 1.81 + ph);
    v = sin((sr - petal) * 18.45);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.77);
	float d = d1 * d2;
	vec3 col = palette(d * 1.23 + time * 0.11, vec3(0.58, 0.49, 0.45), vec3(0.37, 0.42, 0.39), vec3(0.93, 1.31, 1.00), vec3(0.85, 0.07, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
