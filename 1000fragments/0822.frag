uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.15 + t * 4.77 + ph) + sin(p.y * 2.21 - t * 5.93 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 2.37 + time * 0.75) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.29, vec3(0.53, 0.40, 0.45), vec3(0.43, 0.39, 0.33), vec3(0.91, 0.74, 1.26), vec3(0.56, 0.61, 0.88));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
