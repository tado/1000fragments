uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.10 + t * 0.31) - 0.5) * 2.0;
    v = sin((p.y * 4.15 + zx * 0.68 + t * 1.87) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.61;
	p = rot2(length(p) * 1.29 + time * 0.62) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.01, vec3(0.54, 0.53, 0.48), vec3(0.45, 0.37, 0.49), vec3(0.77, 1.17, 1.25), vec3(0.04, 0.44, 0.77));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.18 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
