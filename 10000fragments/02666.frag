uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.14 * cos(sa * 7 + t * 2.67 + ph);
    v = sin((sr - petal) * 15.74);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.41 - t * 6.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 3.07;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.60);
	float d = d1 * d2;
	vec3 col = palette(d * 1.77 + time * 0.21, vec3(0.52, 0.53, 0.42), vec3(0.48, 0.33, 0.48), vec3(0.96, 1.28, 0.85), vec3(0.06, 0.02, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
