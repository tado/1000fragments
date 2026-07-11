uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.57, t * 1.84 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.15 + t * 1.49 + ph) + sin(p.y * 12.40 - t * 5.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.80;
	{ float fr = length(p); p *= 1.0 + -0.53 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = d1 * d2;
	vec3 col = palette(d * 1.74 + time * 0.23, vec3(0.40, 0.52, 0.51), vec3(0.45, 0.31, 0.32), vec3(1.38, 1.25, 1.39), vec3(0.91, 0.53, 0.83));
	col = mod(col * 1.50, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
