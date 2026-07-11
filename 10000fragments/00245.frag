uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.32 + t * 5.81 + ph) + sin(p.y * 2.00 - t * 5.42 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.71 + sin(p.y * 4.80 + t * 2.53) * 2.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.60 * fr * fr; }
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.49);
	float d = d1 + d2;
	vec3 col = palette(d * 0.99 + time * 0.09, vec3(0.57, 0.41, 0.51), vec3(0.31, 0.35, 0.36), vec3(0.83, 1.32, 1.18), vec3(0.34, 0.37, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
