uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.52, t * 1.81 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	p = rot2(length(p) * 2.51 + time * 0.45) * p;
	p += vec2(0.86, 0.24) * sin(length(p) * 2.58 - time * 0.63) * 0.11;
	p = abs(p);
	p = rot2(p.y * -2.87 + time * 0.51) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.13, vec3(0.52, 0.57, 0.59), vec3(0.46, 0.31, 0.33), vec3(0.81, 0.73, 0.72), vec3(0.77, 0.31, 0.98));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
