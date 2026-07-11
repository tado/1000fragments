uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.51 + 0.29 * cos(sa * 5.0 + t * 2.67 + ph);
    v = sin((sr - petal) * 15.03);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.13 + sin(p.y * 3.01 + t * 5.21) * 3.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.18;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.36);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.43 + time * 0.23, vec3(0.51, 0.53, 0.41), vec3(0.32, 0.47, 0.31), vec3(1.40, 0.75, 1.33), vec3(0.40, 0.20, 0.84));
	col = mod(col * 1.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
