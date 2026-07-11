uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.96 + t * 4.99 + ph) + sin(p.y * 2.99 - t * 1.73 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * -1.55 + time * 0.42) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.29, vec3(0.41, 0.57, 0.43), vec3(0.49, 0.50, 0.31), vec3(0.71, 1.16, 0.77), vec3(0.61, 0.79, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
