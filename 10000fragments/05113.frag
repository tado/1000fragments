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
    v = sin(sa * 8.85 + sr * 6.67 - t * 2.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.63) * p;
	{ float fr = length(p); p *= 1.0 + 0.47 * fr * fr; }
	p *= 1.0 + 0.21 * sin(time * 3.80);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.27, vec3(0.53, 0.51, 0.44), vec3(0.48, 0.33, 0.34), vec3(1.13, 0.90, 1.13), vec3(0.44, 0.52, 0.62));
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.91 + time * 8.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
