uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 38.67 - t * 3.30 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 37.78 - t * 2.17 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.74;
    float pk = 6.2831853 / 6.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 17.42 - t * 2.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.17, lr * 1.33 + time * -0.45); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.93 + time * 0.22, vec3(0.55, 0.57, 0.48), vec3(0.34, 0.31, 0.38), vec3(0.99, 1.37, 0.76), vec3(0.41, 0.06, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
