uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.56 + sr * 10.72 - t * 3.31 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.06 + t * 4.81 + ph) + sin(p.y * 11.45 - t * 4.44 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.75);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.51 + time * 0.05, vec3(0.52, 0.43, 0.47), vec3(0.41, 0.36, 0.42), vec3(1.17, 1.21, 1.29), vec3(0.14, 0.97, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
