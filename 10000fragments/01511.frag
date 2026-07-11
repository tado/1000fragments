uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.02 - t * 8.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.92 + time * 0.37) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.08, vec3(0.41, 0.40, 0.52), vec3(0.38, 0.30, 0.36), vec3(1.15, 1.28, 1.36), vec3(0.36, 0.98, 0.58));
	col = mod(col * 2.54, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
