uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.89 + t * 4.70 + ph) + sin(p.y * 11.68 - t * 3.54 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.95 - t * 8.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.11);
	float d = d1 + d2;
	vec3 col = palette(d * 0.93 + time * 0.17, vec3(0.41, 0.46, 0.45), vec3(0.36, 0.38, 0.36), vec3(1.33, 1.37, 1.03), vec3(0.74, 0.89, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
