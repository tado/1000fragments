uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.70 + sr * 21.79 - t * 3.02 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.02 + sin(p.y * 2.15 + t * 5.98) * 4.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	p *= 2.77;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.05);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.26 + time * 0.22, vec3(0.48, 0.46, 0.55), vec3(0.49, 0.48, 0.41), vec3(0.82, 1.06, 1.37), vec3(0.73, 0.94, 0.68));
	col = mod(col * 2.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
