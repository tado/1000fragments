uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.25 + sin(p.y * 4.00 + t * 5.64) * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 1.72 + time * 0.56) * p;
	p = rot2(3.04) * p;
	p = abs(p);
	p = fract(p * 2.45) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.25, vec3(0.60, 0.50, 0.44), vec3(0.49, 0.46, 0.36), vec3(0.90, 0.72, 1.00), vec3(0.60, 0.23, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
