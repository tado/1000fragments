uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.33 - t * 1.29;
    v = sin(floor(lv * 5.0) / 5.0 * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.95, t * 1.67 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	p = rot2(length(p) * 3.70 + time * 1.18) * p;
	p = rot2(p.y * 1.75 + time * 0.23) * p;
	p = rot2(time * -0.34) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.56 + time * 0.19, vec3(0.53, 0.49, 0.48), vec3(0.36, 0.46, 0.48), vec3(0.77, 0.83, 1.12), vec3(0.41, 0.22, 0.51));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
