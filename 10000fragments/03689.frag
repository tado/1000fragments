uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.52 + t * 3.29 + ph) + sin(p.y * 2.17 - t * 3.22 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	p = rot2(1.81) * p;
	p += vec2(-0.63, 0.03) * sin(length(p) * 5.53 - time * 1.28) * 0.36;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.52 + time * 0.11, vec3(0.48, 0.58, 0.60), vec3(0.46, 0.39, 0.42), vec3(1.05, 0.98, 1.10), vec3(0.19, 0.69, 0.90));
	col = clamp((col - 0.5) * 2.03 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
