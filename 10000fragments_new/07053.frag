uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.79, t * 0.99 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.32) - 0.5;
	p = rot2(length(p) * 1.89 + time * 1.12) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.60 + time * 0.19, vec3(0.57, 0.49, 0.53), vec3(0.44, 0.33, 0.31), vec3(1.01, 1.06, 1.26), vec3(0.46, 0.99, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
