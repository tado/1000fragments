uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.75 - t * 8.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(time * 0.32) * p;
	{ p = vec2(atan(p.y, p.x) * 2.88, length(p) * 4.97 - time * 0.70); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.18, vec3(0.41, 0.57, 0.52), vec3(0.39, 0.33, 0.49), vec3(0.78, 1.05, 1.27), vec3(0.28, 0.83, 0.78));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.90 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
