uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.21 + sr * 11.97 - t * 1.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.66, -0.87) * sin(length(p) * 2.90 - time * 0.98) * 0.24;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.16, vec3(0.42, 0.48, 0.58), vec3(0.36, 0.47, 0.33), vec3(1.35, 1.16, 1.25), vec3(0.35, 0.95, 0.87));
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
