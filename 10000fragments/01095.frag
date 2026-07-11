uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.62 + t * 1.51 + ph) + sin(p.y * 13.26 - t * 1.51 + ph)
        + sin((p.x + p.y) * 4.43 + t * 1.51 + ph) + sin(length(p) * 11.26 - t * 1.51 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.42;
	p = abs(p);
	p *= 1.39;
	p += vec2(-0.33, -0.22) * sin(length(p) * 3.31 - time * 1.88) * 0.18;
	{ p = vec2(atan(p.y, p.x) * 1.63, length(p) * 3.68 - time * 0.33); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.28, vec3(0.42, 0.41, 0.56), vec3(0.41, 0.47, 0.48), vec3(1.31, 1.36, 1.33), vec3(0.94, 0.52, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
