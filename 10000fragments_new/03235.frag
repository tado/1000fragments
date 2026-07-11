uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 3.77 * sin(t * 1.35) + t * 3.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	p.y += sin(p.x * 4.70 + time * 3.70) * 0.17;
	p = rot2(p.y * -1.97 + time * 1.11) * p;
	{ float fr = length(p); p *= 1.0 + -0.80 * fr * fr; }
	p = rot2(time * 0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.57 + time * 0.05, vec3(0.53, 0.53, 0.51), vec3(0.42, 0.49, 0.43), vec3(1.33, 1.26, 1.15), vec3(0.79, 0.23, 0.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
