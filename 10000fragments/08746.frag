uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.56 - t * 2.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.05 + time * 0.65) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.28, vec3(0.55, 0.56, 0.47), vec3(0.40, 0.49, 0.46), vec3(0.86, 0.75, 1.19), vec3(0.52, 0.88, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
