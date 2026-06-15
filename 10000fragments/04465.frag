uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.76 + sr * 11.03 - t * 2.41 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.61, t * 0.80 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.50;
	{ p = vec2(atan(p.y, p.x) * 2.16, length(p) * 3.34 - time * 0.47); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.73);
	float d = d1 + d2;
	vec3 col = palette(d * 0.95 + time * 0.28, vec3(0.48, 0.49, 0.48), vec3(0.41, 0.38, 0.40), vec3(1.20, 1.11, 1.18), vec3(0.82, 0.32, 0.10));
	col = clamp((col - 0.5) * 1.78 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
