uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.57 - t * 6.70 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.19 + sr * 7.81 - t * 4.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.55, -0.19) * sin(length(p) * 2.69 - time * 1.27) * 0.29;
	p *= 2.45;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.71);
	float d = d1 + d2;
	vec3 col = palette(d * 0.65 + time * 0.04, vec3(0.58, 0.55, 0.53), vec3(0.43, 0.50, 0.38), vec3(0.93, 1.16, 1.13), vec3(0.08, 0.63, 0.69));
	col = mod(col * 2.19, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
