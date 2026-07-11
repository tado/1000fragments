uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.61 - t * 4.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.98;
	p = rot2(1.01) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.10, vec3(0.60, 0.43, 0.56), vec3(0.48, 0.43, 0.46), vec3(1.28, 0.72, 1.36), vec3(0.01, 0.96, 0.85));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
