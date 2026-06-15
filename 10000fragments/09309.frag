uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.18 * cos(sa * 9 + t * 1.17 + ph);
    v = sin((sr - petal) * 13.31);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.58 + t * 2.09 + ph) + sin(p.y * 6.44 - t * 5.01 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.46);
	float d = d1 * d2;
	vec3 col = palette(d * 1.38 + time * 0.09, vec3(0.44, 0.44, 0.56), vec3(0.49, 0.48, 0.50), vec3(1.04, 0.81, 1.25), vec3(0.48, 0.62, 0.69));
	col = fract(col * 1.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
