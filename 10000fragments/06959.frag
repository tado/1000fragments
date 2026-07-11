uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.65 + sr * 23.52 - t * 1.52 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.00, t * 1.04 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.82;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.07);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.96 + time * 0.18, vec3(0.48, 0.55, 0.50), vec3(0.38, 0.39, 0.36), vec3(0.87, 1.29, 0.88), vec3(0.74, 0.66, 0.29));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
