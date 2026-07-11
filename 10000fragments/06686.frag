uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.76 + sr * 6.32 - t * 1.17 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.13, t * 1.78 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.29;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.18);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.66 + time * 0.24, vec3(0.48, 0.49, 0.43), vec3(0.33, 0.45, 0.37), vec3(0.99, 1.31, 1.08), vec3(0.80, 0.10, 0.20));
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
