uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.78 + sin(p.y * 5.50 + t * 3.23) * 4.99 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.55 + sin(p.y * 3.55 + t * 0.91) * 2.40 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.22;
	p = rot2(time * -0.40) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.99);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.49 + time * 0.02, vec3(0.40, 0.52, 0.41), vec3(0.47, 0.42, 0.37), vec3(0.78, 0.81, 0.94), vec3(0.95, 0.17, 0.53));
	col = mod(col * 2.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
