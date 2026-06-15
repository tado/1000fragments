uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.48 - t * 3.88 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.22 + t * 4.53 + ph) + sin(p.y * 11.76 - t * 5.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	p = rot2(1.64) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.65);
	float d = d1 + d2;
	vec3 col = palette(d * 1.07 + time * 0.02, vec3(0.60, 0.50, 0.45), vec3(0.34, 0.33, 0.36), vec3(1.12, 0.93, 0.93), vec3(0.88, 0.74, 0.59));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
