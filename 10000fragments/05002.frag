uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.53 + sin(p.y * 2.37 + t * 0.81) * 1.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	p = rot2(time * 0.55) * p;
	p = rot2(2.44) * p;
	p = rot2(p.y * 1.48 + time * 0.96) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.10, vec3(0.56, 0.53, 0.49), vec3(0.31, 0.36, 0.30), vec3(1.31, 1.14, 1.18), vec3(0.71, 0.41, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
