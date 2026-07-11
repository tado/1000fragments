uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.55 + t * 2.26 + ph) + sin(p.y * 6.60 - t * 2.26 + ph)
        + sin((p.x + p.y) * 11.59 + t * 2.26 + ph) + sin(length(p) * 14.70 - t * 2.26 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.93, length(p) * 4.97 - time * 0.59); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.03 + time * 0.20, vec3(0.43, 0.40, 0.56), vec3(0.44, 0.41, 0.42), vec3(0.83, 1.26, 0.99), vec3(0.35, 0.78, 0.47));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
