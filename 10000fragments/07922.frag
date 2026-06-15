uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.52 + sin(p.y * 1.77 + t * 5.94) * 1.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.42;
	p = abs(p);
	p += vec2(-0.94, 0.67) * sin(length(p) * 2.40 - time * 1.12) * 0.18;
	p = rot2(p.y * 3.48 + time * 0.99) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.08, vec3(0.49, 0.57, 0.47), vec3(0.35, 0.41, 0.36), vec3(0.93, 0.74, 1.26), vec3(0.91, 0.43, 0.81));
	col = mod(col * 1.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
