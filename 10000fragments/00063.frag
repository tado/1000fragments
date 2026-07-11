uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 14.52 - t * 6.73 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.72 + t * 2.94 + ph) + sin(p.y * 14.91 - t * 5.05 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.06;
	{ p = vec2(atan(p.y, p.x) * 1.77, length(p) * 2.27 - time * 0.31); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.83);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.50 + time * 0.24, vec3(0.45, 0.45, 0.60), vec3(0.44, 0.36, 0.40), vec3(1.04, 1.29, 0.76), vec3(0.69, 0.17, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
