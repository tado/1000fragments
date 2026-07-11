uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.85 - t * 5.55 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.92;
	p = rot2(2.85) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.94 + time * 0.07, vec3(0.56, 0.56, 0.41), vec3(0.43, 0.45, 0.43), vec3(1.23, 1.10, 0.89), vec3(0.80, 0.13, 0.27));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
