uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.27 + sr * 8.32 - t * 3.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.67, -0.90) * sin(length(p) * 5.14 - time * 1.95) * 0.38;
	p = rot2(1.60) * p;
	p *= 3.26;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.10, vec3(0.47, 0.56, 0.58), vec3(0.41, 0.40, 0.30), vec3(0.85, 0.96, 1.03), vec3(0.44, 0.90, 0.93));
	col = mod(col * 1.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
