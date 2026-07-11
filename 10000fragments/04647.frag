uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.55, 0.0)) * 16.58 - t * 4.90 + ph);
    float mb = sin(length(p + vec2(0.55, 0.0)) * 20.24 - t * 4.90 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.69 + t * 2.50 + ph) + sin(p.y * 17.34 - t * 2.61 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.75;
	p = rot2(p.y * -2.78 + time * 0.51) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.82);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.02 + time * 0.27, vec3(0.60, 0.46, 0.52), vec3(0.47, 0.35, 0.32), vec3(0.88, 1.16, 0.93), vec3(0.60, 0.29, 0.60));
	col = mod(col * 2.13, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
