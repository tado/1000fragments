uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.57 + t * 4.44 + ph) + sin(p.y * 17.91 - t * 3.20 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.25 * cos(sa * 3 + t * 0.90 + ph);
    v = sin((sr - petal) * 13.39);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.19);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.78 + time * 0.08, vec3(0.46, 0.56, 0.52), vec3(0.31, 0.37, 0.34), vec3(0.81, 0.93, 1.31), vec3(0.08, 0.44, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
