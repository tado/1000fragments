uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.90 + t * 1.22 + ph) + sin(p.y * 17.08 - t * 1.52 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.96 + t * 1.94 + ph) + sin(p.y * 13.04 - t * 2.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.24) * p;
	p += vec2(0.87, 0.31) * sin(length(p) * 2.72 - time * 1.61) * 0.23;
	{ float fr = length(p); p *= 1.0 + 0.41 * fr * fr; }
	p = rot2(2.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.33);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.75 + time * 0.23, vec3(0.59, 0.59, 0.48), vec3(0.36, 0.37, 0.36), vec3(1.28, 0.74, 0.73), vec3(0.63, 0.31, 0.29));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
