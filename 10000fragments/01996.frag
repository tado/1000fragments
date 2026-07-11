uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.14 + sr * 14.30 - t * 2.34 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.56 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.56 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.05);
	float d = d1 * d2;
	vec3 col = palette(d * 1.71 + time * 0.13, vec3(0.48, 0.45, 0.45), vec3(0.46, 0.48, 0.40), vec3(0.74, 0.90, 1.14), vec3(0.79, 0.48, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
