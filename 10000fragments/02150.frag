uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.08 + sr * 8.81 - t * 1.73 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.30 - t * 6.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p) - 0.46;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.35);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.88 + time * 0.08, vec3(0.46, 0.50, 0.49), vec3(0.39, 0.41, 0.33), vec3(0.95, 1.11, 1.26), vec3(0.76, 0.69, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
