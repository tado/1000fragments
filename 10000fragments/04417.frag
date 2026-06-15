uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.17 - t * 6.72 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.96, t * 1.91 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.58) * p;
	p += vec2(0.93, -0.72) * sin(length(p) * 3.81 - time * 0.67) * 0.30;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.55 + time * 0.17, vec3(0.46, 0.55, 0.42), vec3(0.35, 0.42, 0.42), vec3(0.92, 1.31, 0.98), vec3(0.20, 0.22, 0.04));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
