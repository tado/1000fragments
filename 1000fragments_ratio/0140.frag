uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 6.61 * sin(t * 1.00) + t * 3.48 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.54, t * 0.45 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	float d1 = field(p, (time * 0.55), 0.0);
	float d2 = field2(p, (time * 0.55), 0.67);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.55) * 0.7));
	vec3 col = palette(d * 1.36 + (time * 0.55) * 0.19, vec3(0.28, 0.38, 0.32), vec3(0.28, 0.34, 0.26), vec3(0.89, 0.88, 0.51), vec3(0.71, 0.71, 0.24));
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 0.991, 0.923) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
