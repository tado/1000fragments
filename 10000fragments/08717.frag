uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.56 + t * 3.43 + ph) + sin(p.y * 3.74 - t * 3.19 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.82, t * 1.72 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.01;
	p = fract(p * 2.28) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.71, length(p) * 3.19 - time * 0.57); }
	{ float fr = length(p); p *= 1.0 + -0.48 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.58);
	float d = d1 * d2;
	vec3 col = palette(d * 0.69 + time * 0.26, vec3(0.48, 0.50, 0.42), vec3(0.47, 0.31, 0.46), vec3(1.31, 1.18, 1.32), vec3(0.83, 0.23, 0.01));
	col = mod(col * 2.13, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
