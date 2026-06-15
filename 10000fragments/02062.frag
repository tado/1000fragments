uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.35 + t * 4.61 + ph) + sin(p.y * 17.76 - t * 4.71 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	p += vec2(0.88, 0.22) * sin(length(p) * 3.19 - time * 0.78) * 0.34;
	p = fract(p * 1.33) - 0.5;
	p = rot2(p.y * -1.15 + time * 0.42) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.41 + time * 0.27, vec3(0.52, 0.50, 0.43), vec3(0.34, 0.48, 0.31), vec3(0.94, 0.91, 0.79), vec3(0.93, 0.60, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
