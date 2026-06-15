uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 30.66 - t * 7.41 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 20.84 - t * 7.41 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.95 + t * 1.55 + ph) + sin(p.y * 6.63 - t * 1.55 + ph)
        + sin((p.x + p.y) * 3.01 + t * 1.55 + ph) + sin(length(p) * 15.95 - t * 1.55 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.78);
	float d = d1 + d2;
	vec3 col = palette(d * 1.63 + time * 0.23, vec3(0.60, 0.45, 0.42), vec3(0.46, 0.39, 0.36), vec3(0.97, 0.90, 1.36), vec3(0.86, 0.29, 0.72));
	col = mod(col * 1.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
