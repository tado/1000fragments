uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.34 + t * 2.32 + ph) + sin(p.y * 7.67 - t * 2.32 + ph)
        + sin((p.x + p.y) * 5.14 + t * 2.32 + ph) + sin(length(p) * 16.44 - t * 2.32 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p = abs(p) - 0.21;
	p = rot2(p.y * 3.75 + time * 0.13) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.26, vec3(0.58, 0.41, 0.59), vec3(0.39, 0.46, 0.48), vec3(1.23, 1.12, 1.21), vec3(0.12, 0.65, 0.78));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
