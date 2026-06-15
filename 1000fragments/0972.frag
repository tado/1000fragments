uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.63 + sin(p.y * 5.37 + t * 4.61) * 3.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	p = rot2(length(p) * -1.47 + time * 0.51) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.03, vec3(0.41, 0.50, 0.46), vec3(0.38, 0.44, 0.38), vec3(1.03, 0.84, 0.79), vec3(0.33, 0.17, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
