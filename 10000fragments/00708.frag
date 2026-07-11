uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.06 + sin(p.y * 5.74 + t * 4.26) * 4.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	p = rot2(p.y * -1.49 + time * 0.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.55 + time * 0.21, vec3(0.41, 0.46, 0.55), vec3(0.39, 0.41, 0.44), vec3(0.92, 1.17, 1.19), vec3(0.29, 0.58, 0.40));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
