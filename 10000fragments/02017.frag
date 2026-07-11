uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.90 + sr * 19.00 - t * 2.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	p += vec2(0.55, -0.67) * sin(length(p) * 3.22 - time * 0.85) * 0.30;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.73 + time * 0.22, vec3(0.47, 0.44, 0.59), vec3(0.45, 0.34, 0.41), vec3(0.77, 1.24, 1.24), vec3(0.49, 0.95, 0.87));
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
