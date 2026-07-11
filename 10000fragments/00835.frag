uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.50 + sin(p.y * 2.25 + t * 4.93) * 4.14 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 32.87 - t * 3.59 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(2.41) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.94 + time * 0.28, vec3(0.42, 0.46, 0.55), vec3(0.34, 0.45, 0.46), vec3(1.39, 0.71, 0.76), vec3(0.80, 0.11, 0.05));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
