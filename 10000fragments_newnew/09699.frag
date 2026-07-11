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
    v = sin(qa * 9.0 + qr * 3.87 * sin(t * 1.44) + t * 5.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.21;
	p = rot2(time * 0.77) * p;
	p += vec2(0.01, -0.15) * sin(length(p) * 5.53 - time * 0.95) * 0.39;
	{ p = vec2(atan(p.y, p.x) * 2.41, length(p) * 2.52 - time * 0.84); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.09, vec3(0.57, 0.56, 0.46), vec3(0.44, 0.44, 0.32), vec3(0.88, 1.26, 1.30), vec3(0.22, 0.42, 0.60));
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
