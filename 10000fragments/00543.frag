uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.36 + sin(p.y * 2.42 + t * 1.13) * 3.59 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.41) - 0.5;
	p *= 2.89;
	p += vec2(-0.04, 0.13) * sin(length(p) * 5.71 - time * 0.76) * 0.28;
	p = rot2(length(p) * 2.98 + time * 0.51) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.08, vec3(0.58, 0.44, 0.52), vec3(0.47, 0.45, 0.43), vec3(1.22, 0.81, 1.32), vec3(0.30, 0.45, 0.99));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
